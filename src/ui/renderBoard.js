// src/ui/renderBoard.js

import { PIECES }
  from '../core/pieceData'

import {
  bouncePiece
} from './effects'

export function renderBoard(
  container,
  game,
  highlights,
  onCellClick
) {

  const board =
    document.createElement('div')

  board.className = 'board'

  game.board.forEach((row, y) => {

    row.forEach((cell, x) => {

      const div =
        document.createElement('div')

      div.className = 'cell'

      const canMove =
        highlights.some(m =>
          m.x === x &&
          m.y === y
        )

      if (canMove) {
        div.classList.add(
          'highlight'
        )
      }

      // マスクリック
      div.addEventListener(
        'click',
        () => onCellClick(x, y)
      )

      // 駒
      if (cell) {

        const piece =
          document.createElement('div')

        piece.className =
          'piece'

        piece.textContent =
          PIECES[cell].emoji

        // アニメだけ
        piece.addEventListener(
          'click',
          () => {
            bouncePiece(piece)
          }
        )

        div.appendChild(piece)
      }

      board.appendChild(div)
    })
  })

  container.appendChild(board)
}
