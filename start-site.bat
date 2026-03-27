@echo off
setlocal

cd /d "%~dp0"
set PORT=4173

where python >nul 2>nul
if errorlevel 1 goto powershell_fallback

for /f "tokens=2 delims= " %%a in ('python --version 2^>^&1') do set PYVER=%%a
echo %PYVER% | findstr /b "2." >nul
if not errorlevel 1 goto python2

echo 正在启动本地访问...
echo 地址: http://127.0.0.1:%PORT%/
echo Python 版本: %PYVER%
echo 按 Ctrl+C 可停止服务。
echo.
start "" http://127.0.0.1:%PORT%/
python -m http.server %PORT%
exit /b %errorlevel%

:python2
echo 正在启动本地访问...
echo 地址: http://127.0.0.1:%PORT%/
echo Python 版本: %PYVER%
echo 按 Ctrl+C 可停止服务。
echo.
start "" http://127.0.0.1:%PORT%/
python -m SimpleHTTPServer %PORT%
exit /b %errorlevel%

:powershell_fallback
echo 未找到 Python，改用 PowerShell 启动本地访问。
powershell -ExecutionPolicy Bypass -File "%~dp0serve-site.ps1" -Port %PORT%
