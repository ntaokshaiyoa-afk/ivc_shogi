// src/ui/message.js

const messages = [
  'いいね！',
  'やったー！',
  'ぴよ！',
  'すごい！',
  'たのしい！'
]

export function randomMessage() {
  return messages[
    Math.floor(
      Math.random() *
      messages.length
    )
  ]
}
