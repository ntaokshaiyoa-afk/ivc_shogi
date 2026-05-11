// src/core/game.js

import {
  createInitialBoard
} from './board'

import {
  getLegalMoves
} from './rules'

import {
  isEnemyPiece,
  isPlayerPiece
} from './ownership'

import {
  normalizePiece
} from './capture'

export class Game {

  constructor() {

    this.board =
      createInitialBoard()

    this.selected =
      null

    this.turn =
      'player'

    this.playerHand = []

    this.enemyHand = []
  }

  select(x, y) {

    const piece =
      this.board[y][x]

    if (!piece) {

      this.selected =
        null

      return []
    }

    if (
      this.turn === 'player' &&
      isEnemyPiece(piece)
    ) {
      return []
    }

    if (
      this.turn === 'enemy' &&
      isPlayerPiece(piece)
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

    const movingPiece =
      this.board[from.y][from.x]

    const target =
      this.board[toY][toX]

    // 持ち駒化
    if (target) {

      const captured =
        normalizePiece(target)

      if (
        this.turn === 'player'
      ) {
        this.playerHand.push(
          captured
        )
      }
      else {
        this.enemyHand.push(
          captured
        )
      }
    }

    this.board[toY][toX] =
      movingPiece

    this.board[from.y][from.x] =
      null

    this.selected =
      null

    this.turn =
      this.turn === 'player'
        ? 'enemy'
        : 'player'
  }
}
