import { PIECES } from '../core/pieceData'

export function renderBoard(
  container,
  game,
  highlights,
  onCellClick
) {
  container.innerHTML = ''

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
        div.classList.add('highlight')
      }

      if (cell) {
        const piece =
          document.createElement('div')

        piece.className = 'piece'

        piece.textContent =
          PIECES[cell].emoji

        div.appendChild(piece)
      }

      div.addEventListener(
        'click',
        () => onCellClick(x, y)
      )

      board.appendChild(div)
    })
  })

  container.appendChild(board)
}
