// src/ui/effects.js

export function bouncePiece(element) {
  element.animate(
    [
      {
        transform: "scale(1)",
      },

      {
        transform: "scale(1.18)",
      },

      {
        transform: "scale(1)",
      },
    ],

    {
      duration: 220,
    },
  );
}
