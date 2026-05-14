// src/core/game.js

import { createInitialBoard } from "./board";

import { getLegalMoves } from "./rules";

import { isEnemyPiece, isPlayerPiece } from "./ownership";

import { normalizePiece } from "./capture";

import { checkWinner } from "./judge";

export class Game {
  constructor() {
    this.gameOver = false;
    this.winner = null;

    // 盤面
    this.board = createInitialBoard();

    // 選択中盤面駒
    this.selected = null;

    // 選択中持ち駒
    this.selectedHandPiece = null;

    // 手番
    this.turn = "player";

    // 持ち駒
    this.playerHand = [];

    this.enemyHand = [];
  }

  // =========================
  // 盤面駒選択
  // =========================

  select(x, y) {
    // 持ち駒選択解除
    this.selectedHandPiece = null;

    if (this.gameOver) {
      return [];
    }

    const piece = this.board[y][x];

    if (!piece) {
      this.selected = null;

      return [];
    }

    // プレイヤーターンで敵駒触れない
    if (this.turn === "player" && isEnemyPiece(piece)) {
      return [];
    }

    // CPUターンで自駒触れない
    if (this.turn === "enemy" && isPlayerPiece(piece)) {
      return [];
    }

    this.selected = {
      x,
      y,
    };

    return getLegalMoves(this.board, x, y);
  }

  // =========================
  // 駒移動
  // =========================

  move(toX, toY) {
    if (!this.selected) {
      return;
    }

    const winner = checkWinner(this.board);

    if (winner) {
      this.gameOver = true;
    }

    const from = this.selected;

    const movingPiece = this.board[from.y][from.x];

    const target = this.board[toY][toX];

    // 駒取得
    if (target) {
      const captured = normalizePiece(target);

      if (this.turn === "player") {
        this.playerHand.push(captured);
      } else {
        this.enemyHand.push(captured);
      }
    }

    // 移動
    this.board[toY][toX] = movingPiece;

    this.board[from.y][from.x] = null;

    // 選択解除
    this.selected = null;

    const winner_moved = checkWinner(this.board);

    if (winner_moved) {
      this.gameOver = true;
      this.winner = winner_moved;

      return;
    }

    // ターン変更
    this.turn = this.turn === "player" ? "enemy" : "player";
  }

  // =========================
  // 持ち駒選択
  // =========================

  selectHandPiece(piece) {
    // 盤面選択解除
    this.selected = null;

    this.selectedHandPiece = piece;
  }

  // =========================
  // 持ち駒配置
  // =========================

  drop(toX, toY) {
    if (this.gameOver) {
      return false;
    }

    // 選択なし
    if (!this.selectedHandPiece) {
      return false;
    }

    // 空きマスのみ
    if (this.board[toY][toX]) {
      return false;
    }

    // 配置
    this.board[toY][toX] = this.selectedHandPiece;

    // 持ち駒から削除
    const index = this.playerHand.indexOf(this.selectedHandPiece);

    if (index >= 0) {
      this.playerHand.splice(index, 1);
    }

    // 選択解除
    this.selectedHandPiece = null;

    // ターン変更
    this.turn = "enemy";

    return true;
  }
}
