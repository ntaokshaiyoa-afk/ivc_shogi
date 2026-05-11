// src/core/ai.js

import {
  getLegalMoves
} from './rules'

export function cpuMove(game) {

  const candidates = []

  game.board.forEach((row, y) => {

    row.forEach((piece, x) => {

      if (
        !piece ||
        !piece.startsWith('enemy')
      ) {
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

  // 取れる手優先
  const captureMoves =
    candidates.filter(move => {

      const target =
        game.board[
          move.toY
        ][
          move.toX
        ]

      return target
    })

  const list =
    captureMoves.length > 0
      ? captureMoves
      : candidates

  const selected =
    list[
      Math.floor(
        Math.random() *
        list.length
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
