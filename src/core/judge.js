// src/core/judge.js

export function checkWinner(board) {

  let chickExists = false
  let enemyExists = false

  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {

      const piece = board[y][x]

      if (piece === 'chick') {
        chickExists = true

        // 上端到達
        if (y === 0) {
          return 'player'
        }
      }

      if (piece === 'enemy') {
        enemyExists = true

        // 下端到達
        if (y === 3) {
          return 'enemy'
        }
      }
    }
  }

  if (!enemyExists) {
    return 'player'
  }

  if (!chickExists) {
    return 'enemy'
  }

  return null
}
