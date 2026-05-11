// src/core/game.js

import { createInitialBoard } from './board'
import { getLegalMoves } from './rules'

export class Game {

  constructor() {

    this.board =
      createInitialBoard()

    this.selected = null

    this.turn = 'player'
  }

  select(x, y) {

    const piece =
      this.board[y][x]

    if (!piece) {
      this.selected = null
      return []
    }

    if (
      this.turn === 'player' &&
      piece !== 'chick'
    ) {
      return []
    }

    if (
      this.turn === 'enemy' &&
      piece !== 'enemy'
    ) {
      return []
    }

    this.selected = { x, y }

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

    this.board[toY][toX] =
      piece

    this.board[from.y][from.x] =
      null

    this.selected = null

    this.turn =
      this.turn === 'player'
        ? 'enemy'
        : 'player'
  }
}
