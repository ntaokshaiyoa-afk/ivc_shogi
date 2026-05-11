// src/ui/pieceImage.js

const BASE =
  import.meta.env.BASE_URL

export function pieceImageSrc(
  piece
) {

  const normalized =
    piece
      .replace('enemy', '')
      .toLowerCase()

  return (
    `${BASE}images/pieces/` +
    `${normalized}.svg`
  )
}
