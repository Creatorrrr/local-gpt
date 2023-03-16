#!/bin/bash

start() {
  cd ./backend || return
  yarn start
  cd ..
}

install() {
  cd ./backend || return
  yarn install
  cd ..
}

build() {
  cd ./backend || return
  yarn install --immutable --immutable-cache --check-cache
  yarn build
  cd ..
}

case "$1" in
  start)
    start
    ;;
  install)
    install
    ;;
  build)
    build
    ;;
esac
