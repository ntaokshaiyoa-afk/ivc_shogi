import { Game } from '../core/game'
import { renderBoard } from '../ui/renderBoard'

export function createGameScene(app) {
  const game = new Game()

  let highlights = []

  function rerender() {
    renderBoard(
      app,
      game,
      highlights,
      handleClick
    )
  }

  function handleClick(x, y) {

    const isHighlighted =
      highlights.some(m =>
        m.x === x &&
        m.y === y
      )

    if (isHighlighted) {
      game.move(x, y)

      highlights = []

      rerender()

      return
    }

    highlights =
      game.select(x, y)

    rerender()
  }

  rerender()
}
