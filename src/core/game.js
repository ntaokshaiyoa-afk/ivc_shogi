import { createInitialBoard } from './board'
import { getLegalMoves } from './rules'

export class Game {
  constructor() {
    this.board = createInitialBoard()

    this.selected = null
  }

  select(x, y) {
    const piece = this.board[y][x]

    if (!piece) {
      this.selected = null
      return []
    }

    this.selected = { x, y }

    return getLegalMoves(this.board, x, y)
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
  }
}
