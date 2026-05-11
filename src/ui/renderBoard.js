// src/ui/renderBoard.js

import {
  bouncePiece
} from './effects'

import {
  pieceImageSrc
} from './pieceImage'

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

      // 選択中
      if (
        game.selected &&
        game.selected.x === x &&
        game.selected.y === y
      ) {
        div.classList.add(
          'selected'
        )
      }

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

      div.addEventListener(
        'click',
        () => onCellClick(x, y)
      )

      if (cell) {

        const piece =
          document.createElement('img')

        piece.className =
          'piece'

        piece.src =
          pieceImageSrc(cell)

        piece.draggable =
          false

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
