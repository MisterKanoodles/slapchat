import { useEffect, useState } from "react";
import { friendById, stories } from "../data/sampleData.js";

const SNAP_DURATION_MS = 5000;

// Full-screen story player: tap right to advance, tap left to go back, auto-advances.
export default function StoryViewer({ friendId, onClose, onSeen }) {
  const [storyIndex, setStoryIndex] = useState(() => stories.findIndex((story) => story.friendId === friendId));
  const [snapIndex, setSnapIndex] = useState(0);
  const story = stories[storyIndex];

  useEffect(() => {
    if (story) onSeen(story.friendId);
  }, [story, onSeen]);

  function next() {
    if (snapIndex < story.snaps.length - 1) {
      setSnapIndex(snapIndex + 1);
    } else if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
      setSnapIndex(0);
    } else {
      onClose();
    }
  }

  function previous() {
    if (snapIndex > 0) setSnapIndex(snapIndex - 1);
    else if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
      setSnapIndex(0);
    }
  }

  useEffect(() => {
    const timer = setTimeout(next, SNAP_DURATION_MS);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!story) return null;
  const friend = friendById(story.friendId);
  const snap = story.snaps[snapIndex];

  function onTap(event) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    if (event.clientX - left < width / 3) previous();
    else next();
  }

  return (
    <div className="story-viewer" role="dialog" aria-modal="true" aria-label={`${friend.name}'s Story`}>
      <div className="story-snap" style={{ background: snap.background }} onClick={onTap}>
        <p className="story-caption">{snap.caption}</p>
      </div>
      <div className="story-progress">
        {story.snaps.map((_, index) => (
          <span key={`${story.friendId}-${index}`}>
            <i
              className={index < snapIndex ? "is-done" : index === snapIndex ? "is-active" : ""}
              style={index === snapIndex ? { animationDuration: `${SNAP_DURATION_MS}ms` } : undefined}
              key={`${storyIndex}-${snapIndex}`}
            />
          </span>
        ))}
      </div>
      <header className="story-header">
        <span className="friend-avatar" aria-hidden="true">{friend.emoji}</span>
        <b>{friend.name}</b>
        <button type="button" className="icon-button" aria-label="Close Story" onClick={onClose}>✕</button>
      </header>
    </div>
  );
}
