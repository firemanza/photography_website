@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0ui-ux-pro-max.ps1" %*
exit /b %ERRORLEVEL%
