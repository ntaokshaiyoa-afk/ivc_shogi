// src/scenes/gameScene.js

import { Game } from "../core/game";

import { renderBoard } from "../ui/renderBoard";

import { renderHUD } from "../ui/renderHUD";

import { renderHands } from "../ui/renderHands";

import { renderBuildInfo } from "../ui/renderBuildInfo";

import { cpuMove } from "../core/ai";

import { checkWinner } from "../core/judge";

import { launchConfetti } from "../ui/confetti";

import { playWin } from "../core/sound";

import { playPiyo, playPon } from "../core/sound";

// =========================
// Scene
// =========================

export function createGameScene(app) {
  app.innerHTML = "";

  const game = new Game();

  let highlights = [];

  // =========================
  // 描画
  // =========================

  function rerender() {
    app.innerHTML = "";

    renderHUD(app, game);

    renderBoard(app, game, highlights, handleClick);

    renderHands(app, game, handleHandSelect);

    renderBuildInfo(app);
  }

  function checkGameEnd() {
    if (!game.gameOver) {
      return false;
    }

    launchConfetti();

    playWin();

    setTimeout(() => {
      const retry = confirm(
        game.winner === "player"
          ? "やったー！\nもういっかいやる？"
          : "ざんねん！\nもういっかいやる？",
      );

      if (retry) {
        createGameScene(app);
      }
    }, 300);

    return true;
  }

  // =========================
  // 持ち駒選択
  // =========================

  function handleHandSelect(piece) {
    game.selectHandPiece(piece);

    highlights = [];

    rerender();
  }

  // =========================
  // マスクリック
  // =========================

  function handleClick(x, y) {
    if (game.gameOver) {
      return;
    }
    // -----------------
    // 持ち駒配置
    // -----------------

    if (game.selectedHandPiece) {
      const ok = game.drop(x, y);

      if (!ok) {
        return;
      }

      playPon();

      highlights = [];

      rerender();

      if (checkGameEnd()) {
        return;
      }

      if (game.turn === "enemy") {
        setTimeout(() => {
          cpuMove(game);

          rerender();

          checkGameEnd();
        }, 600);
      }

      return;
    }

    const clicked = game.board[y][x];

    // -----------------
    // 移動
    // -----------------

    const canMove = highlights.some((m) => m.x === x && m.y === y);

    if (canMove && game.selected) {
      game.move(x, y);

      playPon();

      highlights = [];

      rerender();

      // 勝敗確認

      if (checkGameEnd()) {
        return;
      }

      // CPUターン

      if (game.turn === "enemy") {
        setTimeout(() => {
          cpuMove(game);

          rerender();

          checkGameEnd();
        }, 600);
      }

      return;
    }

    // -----------------
    // 選択
    // -----------------

    if (clicked) {
      playPiyo();

      highlights = game.select(x, y);

      rerender();

      return;
    }

    // -----------------
    // 空マス
    // -----------------

    game.selected = null;

    highlights = [];

    rerender();
  }

  // 初回描画
  rerender();
}
