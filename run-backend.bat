@echo off

:run
IF "%~1" == "start" (
  call :start
) ELSE IF "%~1" == "install" (
  call :install
) ELSE IF "%~1" == "build" (
  call :build
)

:start
cd ./backend
yarn start
cd ..
exit /b 0

:install
cd ./backend
yarn install
cd ..
exit /b 0

:build
cd ./backend
yarn install --immutable --immutable-cache --check-cache
yarn build
cd ..
exit /b 0
