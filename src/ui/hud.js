// src/ui/hud.js

export function renderHud(
  app,
  text
) {
  const hud =
    document.createElement('div')

  hud.className = 'hud'

  hud.textContent = text

  app.appendChild(hud)
}
