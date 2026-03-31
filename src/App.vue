<template>
  <div class="cover-screen" id="coverScreen" aria-live="polite">
    <div class="cover-screen__grain" aria-hidden="true"></div>
    <div class="cover-screen__core">
      <p class="cover-screen__eyebrow">A River Before It Appears</p>
      <h1>唐诗长河</h1>
      <p class="cover-screen__lead">金砂尚未归河，时间正在聚拢。</p>
      <div class="cover-screen__loader" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>

  <canvas id="sandCanvas" aria-hidden="true"></canvas>

  <main class="page">
    <header class="hero">
      <p class="hero__eyebrow">River Of Tang Poetry</p>
      <h1>唐诗长河</h1>
      <p class="hero__lead">
        在时间的沙海里，一条金色长河缓慢流过。沿着诗人出生的先后次序前行，点开每一处微光，读他们的一生与诗。
      </p>
    </header>

    <section class="experience" aria-label="唐代诗人时间长河">
      <div class="experience__frame" id="experienceFrame">
        <div class="experience__scene" id="experienceScene">
          <div class="sand-ridges" aria-hidden="true"></div>
          <div class="dune-haze dune-haze--one" aria-hidden="true"></div>
          <div class="dune-haze dune-haze--two" aria-hidden="true"></div>

          <div class="river-aura" aria-hidden="true"></div>
          <canvas class="river-particles" id="riverParticles" aria-hidden="true"></canvas>
          <div class="timeline" id="timeline"></div>
        </div>

        <section class="detail-panel hidden" id="detailPanel" aria-live="polite">
          <button class="detail-panel__close" id="closeDetail" aria-label="关闭诗人介绍">
            ×
          </button>
          <div class="detail-panel__ornament detail-panel__ornament--top" aria-hidden="true"></div>
          <div class="detail-panel__ornament detail-panel__ornament--bottom" aria-hidden="true"></div>
          <p class="detail-panel__year" id="detailYears"></p>
          <h2 id="detailName"></h2>
          <p class="detail-panel__title" id="detailTitle"></p>
          <p class="detail-panel__bio" id="detailBio"></p>

          <div class="detail-panel__grid">
            <section class="detail-panel__section">
              <h3>生平</h3>
              <ul id="detailLife"></ul>
            </section>

            <section class="detail-panel__section">
              <h3>代表作</h3>
              <ul id="detailWorks" class="detail-panel__works"></ul>
            </section>
          </div>
        </section>
      </div>

      <p class="ambient-note ambient-note--left">拖动画面，沿长河缓慢游走</p>
      <p class="ambient-note ambient-note--right">点亮微光，旁边会浮出诗人与诗</p>
    </section>
  </main>

  <aside class="poem-panel hidden" id="poemPanel" aria-live="polite">
    <div class="poem-panel__inner">
      <button class="poem-panel__close" id="closePoem" aria-label="关闭诗词">
        ×
      </button>
      <div class="poem-panel__header">
        <p class="poem-panel__eyebrow" id="poemTitle"></p>
      </div>
      <div class="poem-panel__columns" id="poemColumns"></div>
    </div>
  </aside>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  await import("../script.js");
});
</script>
