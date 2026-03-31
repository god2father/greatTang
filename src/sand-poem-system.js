import * as THREE from "three";
import { gsap } from "gsap";
import { prepareWithSegments } from "@chenglou/pretext";

const SAND_COLORS = ["#E3C16F", "#B8860B", "#D2B48C"];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createCharSampler(font, sampleStep) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { willReadFrequently: true });
  return (char, baselineX, baselineY, color) => {
    if (!char || !char.trim()) {
      return [];
    }

    context.font = font;
    const metrics = context.measureText(char);
    const ascent = Math.ceil(metrics.actualBoundingBoxAscent || parseFloat(font) * 0.82);
    const descent = Math.ceil(metrics.actualBoundingBoxDescent || parseFloat(font) * 0.2);
    const width = Math.max(8, Math.ceil(metrics.width + 18));
    const height = Math.max(8, ascent + descent + 18);
    const drawX = 9;
    const drawY = 9 + ascent;

    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = "alphabetic";
    context.fillText(char, drawX, drawY);

    const imageData = context.getImageData(0, 0, width, height).data;
    const points = [];

    for (let y = 0; y < height; y += sampleStep) {
      for (let x = 0; x < width; x += sampleStep) {
        const offset = (y * width + x) * 4;
        if (imageData[offset + 3] > 24) {
          points.push({
            x: baselineX + (x - drawX),
            y: baselineY + (y - drawY),
          });
        }
      }
    }

    return points;
  };
}

export class SandPoemSystem {
  constructor(container) {
    this.container = container;
    this.progressCallback = null;
    this.root = document.createElement("div");
    this.root.className = "poem-panel__stage";
    this.root.style.display = "none";
    this.textLayer = document.createElement("div");
    this.textLayer.className = "poem-panel__text-layer";
    this.root.appendChild(this.textLayer);
    this.container.appendChild(this.root);

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.geometry = null;
    this.material = null;
    this.points = null;
    this.clock = new THREE.Clock();
    this.mode = "idle";
    this.hasScene = false;
    this.currentConfig = null;
    this.charStates = [];
    this.charReveal = [];
    this.charRanges = [];
    this.textSpans = [];
    this.totalChars = 0;
    this.reportedChars = 0;
    this.cleanupTweens = [];
    this.stageSize = { width: 0, height: 0 };
    this.renderVersion = 0;

    this.setupRenderer();
  }

  setupRenderer() {
    const canvas = document.createElement("canvas");
    canvas.className = "poem-panel__stage-canvas";
    this.root.insertBefore(canvas, this.textLayer);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.z = 2;
  }

  hasContent() {
    return this.hasScene;
  }

  setPoem(config) {
    this.reset(false);
    this.renderVersion += 1;
    const version = this.renderVersion;
    this.currentConfig = { ...config };
    this.progressCallback = config.onProgress ?? null;

    const viewportWidth = Math.max(260, Math.floor(this.container.clientWidth || config.stageWidth || 320));
    const height = Math.max(320, Math.floor(this.container.clientHeight || config.stageHeight || 420));
    this.root.style.display = "block";
    this.root.style.opacity = "1";
    this.textLayer.innerHTML = "";

    const fontSize = config.fontSize;
    const lineHeight = Math.round(fontSize * 1.5);
    const columnGap = config.columnGap ?? 12;
    const columnWidth = config.columnWidth ?? Math.round(fontSize * 1.58);
    const font = `${fontSize}px "Tang Brush", "Tang Serif", serif`;
    prepareWithSegments(config.text, font, { whiteSpace: "pre-wrap" });
    const columns = config.lines ?? config.text.split("\n");
    const rightInset = Math.max(16, Math.round(viewportWidth * 0.08));
    const leftInset = Math.max(18, Math.round(viewportWidth * 0.08));
    const contentWidth =
      rightInset +
      leftInset +
      columns.length * columnWidth +
      Math.max(0, columns.length - 1) * columnGap;
    this.stageSize = { width: contentWidth, height };
    this.root.style.width = `${contentWidth}px`;
    this.root.style.height = `${height}px`;

    this.renderer.setSize(contentWidth, height, false);
    this.camera.left = -contentWidth / 2;
    this.camera.right = contentWidth / 2;
    this.camera.top = height / 2;
    this.camera.bottom = -height / 2;
    this.camera.updateProjectionMatrix();

    const topOffset = Math.max(52, Math.round((height - columns.reduce((max, line) => {
      return Math.max(max, Array.from(line).length * lineHeight);
    }, 0)) * 0.5));
    const sampleStep =
      config.sampleStep ?? clamp(Math.round(fontSize / 9), 2, 4);
    const sampleChar = createCharSampler(font, sampleStep);

    const positions = [];
    const targets = [];
    const velocities = [];
    const alphas = [];
    const colors = [];

    this.charRanges = [];
    this.charStates = [];
    this.charReveal = [];
    this.textSpans = [];
    this.totalChars = Array.from(config.text.replace(/\n/g, "")).length;
    this.reportedChars = 0;

    let globalCharIndex = 0;

    columns.forEach((line, columnIndex) => {
      const columnElement = document.createElement("div");
      columnElement.className = "poem-panel__line";
      columnElement.style.right = `${Math.round(rightInset + columnIndex * (columnWidth + columnGap))}px`;
      columnElement.style.top = `${topOffset}px`;
      columnElement.style.width = `${Math.round(columnWidth)}px`;
      columnElement.style.fontSize = `${fontSize}px`;
      columnElement.style.lineHeight = `${lineHeight}px`;
      this.textLayer.appendChild(columnElement);

      Array.from(line).forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.className = "poem-panel__glyph";
        span.textContent = char === " " ? "\u00a0" : char;
        columnElement.appendChild(span);

        const metrics = this.measureGlyph(char, font);
        const glyphWidth = Math.max(metrics.width, fontSize * 0.8);
        const baselineX =
          contentWidth - rightInset - columnIndex * (columnWidth + columnGap) - columnWidth / 2 - glyphWidth / 2;
        const baselineY = topOffset + charIndex * lineHeight + fontSize * 0.88;
        const points = sampleChar(char, baselineX, baselineY, "#ffffff");
        const start = positions.length / 3;

        points.forEach((point) => {
          const targetX = point.x - contentWidth / 2;
          const targetY = height / 2 - point.y;
          const spawnSide = Math.floor(Math.random() * 3);
          const spawnX =
            spawnSide === 0
              ? targetX - contentWidth * (0.4 + Math.random() * 0.3)
              : spawnSide === 1
                ? contentWidth / 2 + 48 + Math.random() * 64
                : (Math.random() - 0.5) * contentWidth * 1.2;
          const spawnY =
            spawnSide === 2
              ? -height / 2 - 32 - Math.random() * 80
              : targetY + (Math.random() - 0.5) * height * 0.6;
          const spawnZ = -40 - Math.random() * 120;
          const color = new THREE.Color(
            SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)],
          );

          positions.push(spawnX, spawnY, spawnZ);
          targets.push(targetX, targetY, 0);
          velocities.push(0, 0, 0);
          alphas.push(0.74 + Math.random() * 0.22);
          colors.push(color.r, color.g, color.b);
        });

        this.charRanges.push({
          start,
          end: positions.length / 3,
          index: globalCharIndex,
        });
        const charState = { value: 0 };
        this.charStates.push(charState);
        this.charReveal.push(0);
        this.textSpans.push(span);

        const tween = gsap.to(charState, {
          value: 1,
          duration: 0.68,
          delay: globalCharIndex * 0.11,
          ease: "power2.out",
          onStart: () => {
            if (this.renderVersion !== version) {
              return;
            }
            span.classList.add("is-active");
          },
          onUpdate: () => {
            if (this.renderVersion !== version) {
              return;
            }
            this.charReveal[globalCharIndex] = charState.value;
            span.style.setProperty(
              "--glyph-progress",
              charState.value.toFixed(3),
            );
          },
          onComplete: () => {
            if (this.renderVersion !== version) {
              return;
            }
            this.charReveal[globalCharIndex] = 1;
            this.reportedChars += 1;
            if (this.progressCallback) {
              this.progressCallback(this.reportedChars, this.totalChars);
            }
          },
        });
        this.cleanupTweens.push(tween);
        globalCharIndex += 1;
      });
    });

    this.buildGeometry(positions, targets, velocities, alphas, colors);
    this.mode = "appear";
    this.hasScene = true;
  }

  measureGlyph(char, font) {
    if (!this.measureContext) {
      const canvas = document.createElement("canvas");
      this.measureContext = canvas.getContext("2d");
    }
    this.measureContext.font = font;
    return this.measureContext.measureText(char || " ");
  }

  buildGeometry(positions, targets, velocities, alphas, colors) {
    this.disposeGeometry();

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(positions), 3),
    );
    this.geometry.setAttribute(
      "aTarget",
      new THREE.Float32BufferAttribute(new Float32Array(targets), 3),
    );
    this.geometry.setAttribute(
      "aVelocity",
      new THREE.Float32BufferAttribute(new Float32Array(velocities), 3),
    );
    this.geometry.setAttribute(
      "aAlpha",
      new THREE.Float32BufferAttribute(new Float32Array(alphas), 1),
    );
    this.geometry.setAttribute(
      "aColor",
      new THREE.Float32BufferAttribute(new Float32Array(colors), 3),
    );

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uPointSize: { value: 3.8 },
      },
      vertexShader: `
        attribute vec3 aTarget;
        attribute vec3 aVelocity;
        attribute vec3 aColor;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uPointSize;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = uPointSize;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float dist = distance(gl_PointCoord, vec2(0.5));
          float strength = smoothstep(0.5, 0.08, dist);
          gl_FragColor = vec4(vColor, vAlpha * strength);
        }
      `,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
  }

  disperse() {
    if (!this.hasScene || this.mode === "disperse") {
      return;
    }

    this.mode = "disperse";
    this.textSpans.forEach((span) => span.classList.add("is-fading"));
    gsap.to(this.root, {
      opacity: 0,
      duration: 0.9,
      ease: "power2.in",
    });
  }

  reset(clearDom = true) {
    this.renderVersion += 1;
    this.cleanupTweens.forEach((tween) => tween.kill());
    this.cleanupTweens = [];
    gsap.killTweensOf(this.root);
    this.charStates = [];
    this.charReveal = [];
    this.charRanges = [];
    this.textSpans = [];
    this.reportedChars = 0;
    this.totalChars = 0;
    this.mode = "idle";
    this.progressCallback = null;
    this.hasScene = false;
    this.root.style.opacity = "1";
    this.root.style.display = clearDom ? "none" : this.root.style.display;

    if (clearDom) {
      this.textLayer.innerHTML = "";
    }

    this.disposeGeometry();
  }

  disposeGeometry() {
    if (this.points) {
      this.scene.remove(this.points);
      this.points = null;
    }
    if (this.geometry) {
      this.geometry.dispose();
      this.geometry = null;
    }
    if (this.material) {
      this.material.dispose();
      this.material = null;
    }
  }

  resize() {
    if (!this.currentConfig || !this.hasScene) {
      return;
    }

    this.setPoem(this.currentConfig);
  }

  update() {
    if (!this.hasScene || !this.geometry) {
      return;
    }

    const dt = Math.min(this.clock.getDelta(), 0.033);
    const positionAttr = this.geometry.getAttribute("position");
    const targetAttr = this.geometry.getAttribute("aTarget");
    const velocityAttr = this.geometry.getAttribute("aVelocity");
    const alphaAttr = this.geometry.getAttribute("aAlpha");
    const positions = positionAttr.array;
    const targets = targetAttr.array;
    const velocities = velocityAttr.array;
    const alphas = alphaAttr.array;

    for (let rangeIndex = 0; rangeIndex < this.charRanges.length; rangeIndex += 1) {
      const range = this.charRanges[rangeIndex];
      const reveal = this.charReveal[range.index] || 0;
      for (let particleIndex = range.start; particleIndex < range.end; particleIndex += 1) {
        const base = particleIndex * 3;

        if (this.mode === "disperse") {
          velocities[base] += 24 * dt;
          velocities[base + 1] += (Math.random() - 0.5) * 10 * dt;
          velocities[base + 2] += (Math.random() - 0.5) * 2 * dt;
          positions[base] += velocities[base];
          positions[base + 1] += velocities[base + 1];
          positions[base + 2] += velocities[base + 2];
          alphas[particleIndex] *= 0.972;
          continue;
        }

        if (reveal <= 0) {
          positions[base] += velocities[base] * 0.2;
          positions[base + 1] += velocities[base + 1] * 0.2;
          continue;
        }

        velocities[base] += (targets[base] - positions[base]) * (0.045 + reveal * 0.03);
        velocities[base + 1] +=
          (targets[base + 1] - positions[base + 1]) * (0.045 + reveal * 0.03);
        velocities[base + 2] +=
          (targets[base + 2] - positions[base + 2]) * (0.024 + reveal * 0.02);

        velocities[base] *= 0.82;
        velocities[base + 1] *= 0.82;
        velocities[base + 2] *= 0.8;

        positions[base] += velocities[base];
        positions[base + 1] += velocities[base + 1];
        positions[base + 2] += velocities[base + 2];
      }
    }

    positionAttr.needsUpdate = true;
    velocityAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
}
