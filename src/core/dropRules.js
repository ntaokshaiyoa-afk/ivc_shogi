// src/core/dropRules.js

export function getDropSquares(
  board
) {

  const result = []

  for (let y = 0; y < 4; y++) {

    for (let x = 0; x < 3; x++) {

      if (!board[y][x]) {

        result.push({
          x,
          y
        })
      }
    }
  }

  return result
}
