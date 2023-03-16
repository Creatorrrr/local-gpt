@echo off

set DOCKER_COMPOSE_PATH="%CD%/docker-compose.yml"
goto :run

:build
cd ./frontend
yarn install --immutable --immutable-cache --check-cache
yarn build
cd ..
exit /b 0

:start
docker-compose -f %DOCKER_COMPOSE_PATH% up -d --build
exit /b 0

:start_web
docker-compose -f %DOCKER_COMPOSE_PATH% up -d --build web
exit /b 0

:start_db
docker-compose -f %DOCKER_COMPOSE_PATH% up -d --build db
exit /b 0

:restart_web
docker-compose -f %DOCKER_COMPOSE_PATH% restart web
exit /b 0

:restart_db
docker-compose -f %DOCKER_COMPOSE_PATH% restart web
exit /b 0

:down
docker-compose -f %DOCKER_COMPOSE_PATH% down
exit /b 0

:log
docker-compose -f %DOCKER_COMPOSE_PATH% logs -f
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
)
