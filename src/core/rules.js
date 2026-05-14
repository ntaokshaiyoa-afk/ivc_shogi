// src/core/rules.js

function inside(x, y) {
  return x >= 0 && x < 3 && y >= 0 && y < 4;
}

function isEnemy(piece, target) {
  if (!target) {
    return true;
  }

  const player = !piece.startsWith("enemy");

  const targetPlayer = !target.startsWith("enemy");

  return player !== targetPlayer;
}

export function getLegalMoves(board, x, y) {
  const piece = board[y][x];

  if (!piece) {
    return [];
  }

  const moves = [];

  function add(dx, dy) {
    const nx = x + dx;
    const ny = y + dy;

    if (!inside(nx, ny)) {
      return;
    }

    const target = board[ny][nx];

    if (isEnemy(piece, target)) {
      moves.push({
        x: nx,
        y: ny,
      });
    }
  }

  // ひよこ
  if (piece === "chick") {
    add(0, -1);
  }

  if (piece === "enemyChick") {
    add(0, 1);
  }

  // ライオン
  if (piece === "lion" || piece === "enemyLion") {
    add(-1, -1);
    add(0, -1);
    add(1, -1);

    add(-1, 0);
    add(1, 0);

    add(-1, 1);
    add(0, 1);
    add(1, 1);
  }

  // きりん
  if (piece === "giraffe" || piece === "enemyGiraffe") {
    add(0, -1);
    add(-1, 0);
    add(1, 0);
    add(0, 1);
  }

  // ぞう
  if (piece === "elephant" || piece === "enemyElephant") {
    add(-1, -1);
    add(1, -1);

    add(-1, 1);
    add(1, 1);
  }

  return moves;
}
