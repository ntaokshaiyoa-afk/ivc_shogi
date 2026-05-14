// src/core/capture.js

export function normalizePiece(piece) {
  return piece.replace("enemy", "").replace(/^./, (s) => s.toLowerCase());
}
