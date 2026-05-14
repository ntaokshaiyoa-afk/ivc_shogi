// vite.config.js

import { defineConfig } from "vite";

import { VitePWA } from "vite-plugin-pwa";

function buildTimeJST() {
  const now = new Date();

  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  return jst.toISOString().replace("T", " ").substring(0, 16) + " JST";
}

export default defineConfig({
  base: "/ivc_shogi/",

  define: {
    __BUILD_TIME__: JSON.stringify(buildTimeJST()),
  },

  plugins: [
    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "どうぶつしょうぎ",

        short_name: "どうぶつしょうぎ",

        theme_color: "#ffd54f",

        background_color: "#fff8e1",

        display: "standalone",

        icons: [
          {
            src: "/icons/icon-192.png",

            sizes: "192x192",

            type: "image/png",
          },

          {
            src: "/icons/icon-512.png",

            sizes: "512x512",

            type: "image/png",
          },
        ],
      },
    }),
  ],
});
