// src/ui/renderBuildInfo.js

export function renderBuildInfo(app) {
  const div = document.createElement("div");

  div.className = "build-info";

  // Vite環境変数
  const buildTime = __BUILD_TIME__ || "unknown";

  div.textContent = `build: ${buildTime}`;

  app.appendChild(div);
}
