// src/core/sound.js

const BASE = import.meta.env.BASE_URL;

const cache = new Map();

// =========================
// 安全Audio作成
// =========================

async function loadAudio(filename) {
  const url = `${BASE}sounds/${filename}`;

  // キャッシュ済み
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    // 存在確認
    const res = await fetch(url, {
      method: "HEAD",
    });

    if (!res.ok) {
      console.warn("[sound missing]", url);

      cache.set(url, null);

      return null;
    }

    const audio = new Audio(url);

    audio.preload = "auto";

    cache.set(url, audio);

    return audio;
  } catch (err) {
    console.warn("[sound load failed]", url, err);

    cache.set(url, null);

    return null;
  }
}

// =========================
// 安全再生
// =========================

async function safePlay(filename) {
  const audio = await loadAudio(filename);

  // 無音fallback
  if (!audio) {
    return;
  }

  try {
    audio.currentTime = 0;

    await audio.play();
  } catch (err) {
    // iOS Safari対策
    console.warn("[sound play blocked]", filename, err);
  }
}

// =========================
// exported
// =========================

export function playPiyo() {
  safePlay("piyo.mp3");
}

export function playPon() {
  safePlay("pon.mp3");
}

export function playWin() {
  safePlay("win.mp3");
}
