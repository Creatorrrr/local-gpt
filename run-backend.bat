@echo off

goto :run

:start
cd ./backend
call yarn start
cd ..
exit /b 0

:install
cd ./backend
call yarn install
cd ..
exit /b 0

:build
cd ./backend
call yarn install --immutable --immutable-cache --check-cache
call yarn build
cd ..
exit /b 0

:run
IF "%~1" == "start" (
  call :start
) ELSE IF "%~1" == "install" (
  call :install
) ELSE IF "%~1" == "build" (
  call :build
) ELSE IF "%~1" == "" (
  echo "명령어를 입력하세요: start, install, build"
) ELSE (
  echo "잘못된 명령어입니다. 다음 중 하나를 입력하세요: start, install, build"
)
