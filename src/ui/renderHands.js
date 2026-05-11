// src/ui/renderHands.js

import {
  PIECES
} from '../core/pieceData'

export function renderHands(
  app,
  game,
  onSelect
) {

  const root =
    document.createElement('div')

  root.className =
    'hands'

  const player =
    document.createElement('div')

  player.className =
    'hand'

  game.playerHand.forEach(
    piece => {

      const div =
        document.createElement('div')

      div.className =
        'hand-piece'

      if (
        game.selectedHandPiece
        === piece
      ) {
        div.classList.add(
          'selected-hand'
        )
      }

      div.textContent =
        PIECES[piece].emoji

      div.addEventListener(
        'click',
        () => onSelect(piece)
      )

      player.appendChild(div)
    }
  )

  root.appendChild(player)

  app.appendChild(root)
}
