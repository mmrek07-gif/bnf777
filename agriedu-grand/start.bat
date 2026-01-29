@echo off
start cmd /k "cd /d %~dp0backend && py -3.11 -m uvicorn app.main:app --host 127.0.0.1 --port 8000"
start cmd /k "cd /d %~dp0frontend && py -3.11 -m http.server 5500"
echo ??????? ????????!
echo.
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://127.0.0.1:5500
echo.
pause
