// src/core/judge.js

export function checkWinner(board) {

  let playerLion = false
  let enemyLion = false

  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 3; x++) {

      const piece =
        board[y][x]

      if (piece === 'lion') {
        playerLion = true
      }

      if (piece === 'enemyLion') {
        enemyLion = true
      }
    }
  }

  if (!enemyLion) {
    return 'player'
  }

  if (!playerLion) {
    return 'enemy'
  }

  return null
}
