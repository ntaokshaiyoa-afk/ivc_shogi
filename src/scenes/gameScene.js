// src/scenes/gameScene.js

import { Game } from '../core/game'

import { renderBoard }
  from '../ui/renderBoard'

import { renderHud }
  from '../ui/hud'

import { cpuMove }
  from '../core/ai'

import { checkWinner }
  from '../core/judge'

import {
  randomMessage
} from '../ui/message'

import {
  playMoveSound,
  playWinSound
} from '../ui/sounds'

export function createGameScene(app) {

  const game = new Game()

  let highlights = []

  let message =
    'きみのばん！'

  function rerender() {

    app.innerHTML = ''

    renderHud(
      app,
      message
    )

    renderBoard(
      app,
      game,
      highlights,
      handleClick
    )
  }

  function finishGame(winner) {

    playWinSound()

    if (winner === 'player') {
      message =
        'かったー！'
    }
    else {
      message =
        'まけちゃった！'
    }

    rerender()

    setTimeout(() => {

      alert('もういっかい！')

      location.reload()

    }, 1200)
  }

  function enemyTurn() {

    message =
      'あいてのばん！'

    rerender()

    setTimeout(() => {

      cpuMove(game)

      playMoveSound()

      const winner =
        checkWinner(
          game.board
        )

      if (winner) {
        finishGame(winner)
        return
      }

      message =
        'きみのばん！'

      rerender()

    }, 800)
  }

  function handleClick(x, y) {

    if (game.turn !== 'player') {
      return
    }

    const isHighlighted =
      highlights.some(m =>
        m.x === x &&
        m.y === y
      )

    if (isHighlighted) {

      game.move(x, y)

      playMoveSound()

      highlights = []

      const winner =
        checkWinner(
          game.board
        )

      if (winner) {
        finishGame(winner)
        return
      }

      message =
        randomMessage()

      rerender()

      enemyTurn()

      return
    }

    highlights =
      game.select(x, y)

    rerender()
  }

  rerender()
}
