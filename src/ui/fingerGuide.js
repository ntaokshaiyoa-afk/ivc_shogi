// src/ui/fingerGuide.js

export function renderFingerGuide(
  container,
  highlights
) {

  if (
    highlights.length === 0
  ) {
    return
  }

  const target =
    highlights[0]

  const finger =
    document.createElement('div')

  finger.className =
    'finger-guide'

  finger.style.left =
    `${target.x * 30 + 50}%`

  finger.style.top =
    `${target.y * 24 + 10}%`

  finger.textContent =
    '👇'

  container.appendChild(
    finger
  )
}
