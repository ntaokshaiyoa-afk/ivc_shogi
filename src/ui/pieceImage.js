// src/ui/pieceImage.js

export function pieceImageSrc(
  piece
) {

  const normalized =
    piece
      .replace('enemy', '')
      .toLowerCase()

  return `/images/pieces/${normalized}.svg`
}
