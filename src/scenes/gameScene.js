// src/scenes/gameScene.js

import { Game }
  from '../core/game'

import { renderBoard }
  from '../ui/renderBoard'

import {
  renderHands
} from '../ui/renderHands'

import {
  renderFingerGuide
} from '../ui/fingerGuide'

import { renderHud }
  from '../ui/hud'

import {
  renderBuildInfo
} from '../ui/buildInfo'

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

  // 追加
  const hudRoot =
    document.createElement('div')

  const boardRoot =
    document.createElement('div')

  app.appendChild(hudRoot)
  app.appendChild(boardRoot)

  function rerender() {

    app.innerHTML = ''

    const hudRoot =
      document.createElement('div')

    const boardRoot =
      document.createElement('div')

    app.appendChild(hudRoot)
    app.appendChild(boardRoot)

    renderHud(
      hudRoot,
      message
    )

    renderBoard(
  boardRoot,
  game,
  highlights,
  handleClick
)

renderFingerGuide(
  boardRoot,
  highlights
)

renderHands(
  app,
  game
)

renderBuildInfo(app)
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
