#!/bin/bash

start() {
  cd ./frontend || return
  yarn start
  cd ..
}

install() {
  cd ./frontend || return
  yarn install
  cd ..
}

build() {
  cd ./frontend || return
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
