// src/ui/renderBoard.js

import {
  PIECES
} from '../core/pieceData'

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

      // 移動可能
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

      // クリック
      div.addEventListener(
  'click',
  () => {

    const pieceElement =
      div.querySelector(
        '.piece, .piece-fallback'
      )

    if (pieceElement) {

      bouncePiece(
        pieceElement
      )
    }

    onCellClick(x, y)
  }
)

      // 駒
      if (cell) {

        const wrapper =
          document.createElement(
            'div'
          )

        wrapper.className =
          'piece-wrapper'

        // SVG画像
        const img =
          document.createElement(
            'img'
          )

        img.className =
  cell.startsWith('enemy')
    ? 'piece enemy'
    : 'piece'

        img.src =
          pieceImageSrc(cell)

        img.draggable =
          false

        // フォールバック
        img.onerror = () => {

          img.remove()

          const fallback =
            document.createElement(
              'div'
            )

          fallback.className =
            'piece-fallback'

          fallback.textContent =
            PIECES[cell].emoji

          wrapper.appendChild(
            fallback
          )
        }

        
        wrapper.appendChild(img)

        div.appendChild(wrapper)
      }

      board.appendChild(div)
    })
  })

  container.appendChild(board)
}
