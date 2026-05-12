// src/scenes/gameScene.js

import { Game } from '../core/game'

import { renderBoard }
  from '../ui/renderBoard'

import { renderHUD }
  from '../ui/renderHUD'

import { renderHands }
  from '../ui/renderHands'

import { renderBuildInfo }
  from '../ui/renderBuildInfo'

import {
  playPiyo,
  playPon
} from '../core/sound'

const app =
  document.querySelector('#app')

const game =
  new Game()

// 超重要
let highlights = []

// =========================
// 描画
// =========================

function rerender() {

  app.innerHTML = ''

  renderHUD(
    app,
    game
  )

  renderBoard(
    app,
    game,
    highlights,
    handleClick
  )

  renderHands(
    app,
    game,
    handleHandSelect
  )

  renderBuildInfo(app)
}

// =========================
// 持ち駒選択
// =========================

function handleHandSelect(
  piece
) {

  game.selectHandPiece(
    piece
  )

  highlights = []

  rerender()
}

// =========================
// マスクリック
// =========================

function handleClick(x, y) {

  // -----------------
  // 持ち駒配置
  // -----------------

  if (
    game.selectedHandPiece
  ) {

    const ok =
      game.drop(x, y)

    if (!ok) {
      return
    }

    playPon()

    highlights = []

    rerender()

    return
  }

  const clicked =
    game.board[y][x]

  // -----------------
  // 移動処理
  // -----------------

  const canMove =
    highlights.some(m =>
      m.x === x &&
      m.y === y
    )

  if (
    canMove &&
    game.selected
  ) {

    game.move(x, y)

    playPon()

    highlights = []

    rerender()

    return
  }

  // -----------------
  // 駒選択
  // -----------------

  if (clicked) {

    playPiyo()

    highlights =
      game.select(x, y)

    rerender()

    return
  }

  // -----------------
  // 空マス
  // -----------------

  game.selected = null

  highlights = []

  rerender()
}

// 初回描画
rerender()
