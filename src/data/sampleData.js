// Placeholder content until accounts and a backend exist.

export const friends = [
  { id: "maya", name: "Maya", emoji: "👩🏻", status: "new-snap", time: "2m", streak: 12 },
  { id: "jordan", name: "Jordan", emoji: "🧑🏾", status: "new-chat", time: "just now" },
  { id: "luca", name: "Luca", emoji: "🧔🏻", status: "opened", time: "1h", streak: 4 },
  { id: "sam", name: "Sam", emoji: "👩🏽", status: "received", time: "3h" },
  { id: "ari", name: "Ari", emoji: "👨🏼", status: "delivered", time: "yesterday" }
];

export const stories = [
  {
    friendId: "maya",
    seen: false,
    snaps: [
      { background: "linear-gradient(160deg, #f7b267, #f4845f 55%, #b5446e)", caption: "golden hour kind of day ☀" },
      { background: "linear-gradient(200deg, #355c7d, #6c5b7b 50%, #c06c84)", caption: "the drive home 🚗" }
    ]
  },
  {
    friendId: "jordan",
    seen: false,
    snaps: [{ background: "linear-gradient(140deg, #134e5e, #71b280)", caption: "found the best taco spot 🌮" }]
  },
  {
    friendId: "luca",
    seen: false,
    snaps: [
      { background: "linear-gradient(170deg, #232526, #414345)", caption: "studio late night 🎧" },
      { background: "linear-gradient(170deg, #ffd89b, #19547b)", caption: "...and sunrise" }
    ]
  },
  {
    friendId: "sam",
    seen: true,
    snaps: [{ background: "linear-gradient(150deg, #ee9ca7, #ffdde1)", caption: "new hair who dis 💇🏽‍♀️" }]
  }
];

export const discover = [
  { title: "Little things, big energy", tag: "FOR YOU", background: "linear-gradient(135deg, #415d51, #ce9473)" },
  { title: "Weekend plans?", tag: "FRIENDS", background: "linear-gradient(135deg, #3a1c71, #d76d77 60%, #ffaf7b)" },
  { title: "Snack rankings", tag: "FOOD", background: "linear-gradient(135deg, #f7971e, #ffd200)" },
  { title: "Sky watch", tag: "OUTSIDE", background: "linear-gradient(135deg, #2193b0, #6dd5ed)" }
];

export function friendById(id) {
  return friends.find((friend) => friend.id === id);
}
