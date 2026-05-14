// src/core/ownership.js

export function isEnemyPiece(piece) {
  return piece && piece.startsWith("enemy");
}

export function isPlayerPiece(piece) {
  return piece && !piece.startsWith("enemy");
}
