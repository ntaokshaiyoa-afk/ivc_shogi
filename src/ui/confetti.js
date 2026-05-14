// src/ui/confetti.js

export function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    const div = document.createElement("div");

    div.className = "confetti";

    div.style.left = `${Math.random() * 100}vw`;

    div.style.animationDelay = `${Math.random() * 0.5}s`;

    div.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}
