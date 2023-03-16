@echo off
chcp 65001 > NUL

set DOCKER_COMPOSE_PATH="%CD%/docker-compose.yml"
goto :run

:build
cd ./frontend
call yarn install --immutable --immutable-cache --check-cache
call yarn build
cd ..
exit /b 0

:start
call docker-compose -f %DOCKER_COMPOSE_PATH% up -d --build
exit /b 0

:start_web
call docker-compose -f %DOCKER_COMPOSE_PATH% up -d --build web
exit /b 0

:start_db
call docker-compose -f %DOCKER_COMPOSE_PATH% up -d --build db
exit /b 0

:restart_web
call docker-compose -f %DOCKER_COMPOSE_PATH% restart web
exit /b 0

:restart_db
call docker-compose -f %DOCKER_COMPOSE_PATH% restart web
exit /b 0

:down
call docker-compose -f %DOCKER_COMPOSE_PATH% down
exit /b 0

:log
call docker-compose -f %DOCKER_COMPOSE_PATH% logs -f
exit /b 0

:run
IF "%~1" == "start" (
  call :down
  call :build
  call :start
  call :log
) ELSE IF "%~1" == "reload_web" (
  call :build
  call :start_web
  call :log
) ELSE IF "%~1" == "reload_db" (
  call :start_db
  call :log
) ELSE IF "%~1" == "restart_web" (
  call :restart_web
  call :log
) ELSE IF "%~1" == "restart_db" (
  call :restart_db
  call :log
) ELSE IF "%~1" == "stop" (
  call :down
) ELSE IF "%~1" == "" (
  echo "명령어를 입력하세요: start, reload_web, reload_db, restart_web, restart_db, stop"
) ELSE (
  echo "잘못된 명령어입니다. 다음 중 하나를 입력하세요: start, reload_web, reload_db, restart_web, restart_db, stop"
)

