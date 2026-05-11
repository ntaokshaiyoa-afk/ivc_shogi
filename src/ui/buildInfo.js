// src/ui/buildInfo.js

export function renderBuildInfo(
  app
) {

  const div =
    document.createElement('div')

  div.className =
    'build-info'

  div.textContent =
    `build: ${__BUILD_TIME__}`

  app.appendChild(div)
}
