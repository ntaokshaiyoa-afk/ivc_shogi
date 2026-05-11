// src/core/ai.js

import { getLegalMoves } from './rules'

export function cpuMove(game) {

  const candidates = []

  game.board.forEach((row, y) => {
    row.forEach((piece, x) => {

      if (piece !== 'enemy') {
        return
      }

      const moves =
        getLegalMoves(
          game.board,
          x,
          y
        )

      moves.forEach(move => {
        candidates.push({
          fromX: x,
          fromY: y,
          toX: move.x,
          toY: move.y
        })
      })
    })
  })

  if (candidates.length === 0) {
    return
  }

  const selected =
    candidates[
      Math.floor(
        Math.random() *
        candidates.length
      )
    ]

  game.selected = {
    x: selected.fromX,
    y: selected.fromY
  }

  game.move(
    selected.toX,
    selected.toY
  )
}
