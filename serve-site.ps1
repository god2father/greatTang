param(
  [int]$Port = 4173
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$prefix = "http://127.0.0.1:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg" = "image/svg+xml"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif" = "image/gif"
  ".ico" = "image/x-icon"
  ".woff2" = "font/woff2"
  ".woff" = "font/woff"
  ".ttf" = "font/ttf"
  ".txt" = "text/plain; charset=utf-8"
}

function Get-ContentType {
  param([string]$Path)

  $extension = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
  if ($mimeTypes.ContainsKey($extension)) {
    return $mimeTypes[$extension]
  }

  return "application/octet-stream"
}

function Resolve-RequestPath {
  param([string]$RawUrl)

  $relative = [System.Uri]::UnescapeDataString(($RawUrl -split "\?")[0]).TrimStart("/")
  if ([string]::IsNullOrWhiteSpace($relative)) {
    $relative = "index.html"
  }

  $fullPath = [System.IO.Path]::GetFullPath((Join-Path $root $relative))
  if (-not $fullPath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Blocked path traversal."
  }

  if ((Test-Path $fullPath) -and (Get-Item $fullPath).PSIsContainer) {
    $fullPath = Join-Path $fullPath "index.html"
  }

  return $fullPath
}

try {
  $listener.Start()
  Write-Host "Starting local site..."
  Write-Host "URL: $prefix"
  Write-Host "Press Ctrl+C to stop."
  Start-Process $prefix | Out-Null

  while ($listener.IsListening) {
    $context = $listener.GetContext()

    try {
      $response = $context.Response
      $path = Resolve-RequestPath -RawUrl $context.Request.RawUrl

      if (-not (Test-Path $path) -or (Get-Item $path).PSIsContainer) {
        $response.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        $response.ContentType = "text/plain; charset=utf-8"
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($path)
      $response.StatusCode = 200
      $response.ContentType = Get-ContentType -Path $path
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch {
      try {
        $context.Response.StatusCode = 500
        $bytes = [System.Text.Encoding]::UTF8.GetBytes("Server Error")
        $context.Response.ContentType = "text/plain; charset=utf-8"
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      } catch {
      }
    } finally {
      try {
        $context.Response.OutputStream.Close()
      } catch {
      }
    }
  }
} finally {
  if ($listener.IsListening) {
    $listener.Stop()
  }
  $listener.Close()
}
