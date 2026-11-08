import { friends } from "../data/sampleData.js";

// Mirrors the 2018 snap status icons: filled = new, outline = opened/sent.
const statusLabels = {
  "new-snap": { label: "New Snap", icon: "■", tone: "snap" },
  "new-chat": { label: "New Chat", icon: "■", tone: "chat" },
  opened: { label: "Opened", icon: "□", tone: "snap" },
  received: { label: "Received", icon: "□", tone: "chat" },
  delivered: { label: "Delivered", icon: "➤", tone: "snap" }
};

export default function ChatsScreen({ onBack, showToast }) {
  return (
    <section className="panel" aria-labelledby="chatsTitle">
      <header className="panel-header">
        <h2 id="chatsTitle">Chats</h2>
        <button type="button" className="panel-back" aria-label="Back to camera" onClick={onBack}>◉</button>
      </header>
      <ul className="chat-list">
        {friends.map((friend) => {
          const status = statusLabels[friend.status];
          const isNew = friend.status.startsWith("new");
          return (
            <li key={friend.id}>
              <button type="button" className="chat-row" onClick={() => showToast(`Chatting with ${friend.name} is coming soon.`)}>
                <span className="friend-avatar" aria-hidden="true">{friend.emoji}</span>
                <span className="chat-copy">
                  <b>{friend.name}</b>
                  <small className={`chat-status tone-${status.tone}${isNew ? " is-new" : ""}`}>
                    <span aria-hidden="true">{status.icon}</span> {status.label} · {friend.time}
                  </small>
                </span>
                {friend.streak && <span className="streak">{friend.streak} 🔥</span>}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="panel-note">Sample chats for now. Messaging isn't connected yet.</p>
    </section>
  );
}
