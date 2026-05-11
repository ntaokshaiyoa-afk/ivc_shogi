// src/core/game.js

import {
  createInitialBoard
} from './board'

import {
  getLegalMoves
} from './rules'

export class Game {

  constructor() {

    this.board =
      createInitialBoard()

    this.selected =
      null

    this.turn =
      'player'
  }

  select(x, y) {

    const piece =
      this.board[y][x]

    if (!piece) {

      this.selected =
        null

      return []
    }

    // プレイヤーターン
    if (
      this.turn === 'player' &&
      piece.startsWith('enemy')
    ) {
      return []
    }

    // CPUターン
    if (
      this.turn === 'enemy' &&
      !piece.startsWith('enemy')
    ) {
      return []
    }

    this.selected = {
      x,
      y
    }

    return getLegalMoves(
      this.board,
      x,
      y
    )
  }

  move(toX, toY) {

    if (!this.selected) {
      return
    }

    const from =
      this.selected

    const piece =
      this.board[from.y][from.x]

    // 移動
    this.board[toY][toX] =
      piece

    this.board[from.y][from.x] =
      null

    this.selected =
      null

    // ターン交代
    this.turn =
      this.turn === 'player'
        ? 'enemy'
        : 'player'
  }
}
