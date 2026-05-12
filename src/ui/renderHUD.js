// src/ui/renderHUD.js

export function renderHUD(
  app,
  game
) {

  const hud =
    document.createElement('div')

  hud.className = 'hud'

  // メッセージ
  let text = ''

  if (
    game.turn === 'player'
  ) {

    text = 'きみのばん！'
  }
  else {

    text = 'あいてのばん'
  }

  // 持ち駒選択中
  if (
    game.selectedHandPiece
  ) {

    text =
      'おきたいばしょをタップ！'
  }

  hud.textContent = text

  app.appendChild(hud)
}
