export function getLegalMoves(board, x, y) {
  const piece = board[y][x]

  if (!piece) {
    return []
  }

  const moves = []

  if (piece === 'chick') {
    const ny = y - 1

    if (ny >= 0) {
      moves.push({
        x,
        y: ny
      })
    }
  }

  if (piece === 'enemy') {
    const ny = y + 1

    if (ny < 4) {
      moves.push({
        x,
        y: ny
      })
    }
  }

  return moves
}
