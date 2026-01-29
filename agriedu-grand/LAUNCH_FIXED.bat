@echo off
chcp 65001 >nul
cls

echo.
echo ================================================================
echo        AGRIEDU AI SUITE v2.0 - Запускается...
echo             Искусственный интеллект для сельского хозяйства
echo                проект "Умное-земледелие"
echo ================================================================
echo.
echo Дата: %date%
echo Время: %time%
echo.

echo [1] Запуск Backend API...
start "AgriEdu Backend" cmd /k "cd /d backend && py -3.11 -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"
echo.

echo [2] Запуск Frontend сервера...
start "AgriEdu Frontend" cmd /k "cd /d frontend && py -3.11 -m http.server 5500"
echo.

timeout /t 5 /nobreak >nul

echo [3] Открываем ссылки...
start http://127.0.0.1:8000/api/docs
start http://127.0.0.1:5500
echo.

echo ✅ Система запущена!
echo.
echo Доступные URL:
echo    ► Backend:  http://localhost:8000
echo    ► Docs:     http://localhost:8000/api/docs
echo    ► Frontend: http://localhost:5500
echo.
pause
