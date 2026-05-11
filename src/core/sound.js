// src/core/sound.js

const piyo =
  new Audio('/sounds/piyo.mp3')

const pon =
  new Audio('/sounds/pon.mp3')

const win =
  new Audio('/sounds/win.mp3')

export function playPiyo() {

  piyo.currentTime = 0
  piyo.play()
}

export function playPon() {

  pon.currentTime = 0
  pon.play()
}

export function playWin() {

  win.currentTime = 0
  win.play()
}
