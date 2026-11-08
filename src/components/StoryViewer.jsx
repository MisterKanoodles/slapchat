import { useEffect, useRef, useState } from "react";
import { friendById, stories } from "../data/sampleData.js";

const SNAP_DURATION_MS = 5000;
const HOLD_MS = 200;

// Full-screen story player: tap right to advance, tap left to go back, press and hold to pause.
export default function StoryViewer({ friendId, onClose, onSeen }) {
  const [storyIndex, setStoryIndex] = useState(() => stories.findIndex((story) => story.friendId === friendId));
  const [snapIndex, setSnapIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const remainingRef = useRef(SNAP_DURATION_MS);
  const holdTimerRef = useRef(null);
  const heldRef = useRef(false);
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

  // Each new snap gets the full duration.
  useEffect(() => {
    remainingRef.current = SNAP_DURATION_MS;
  }, [storyIndex, snapIndex]);

  // Count down whatever is left of the current snap while not paused.
  useEffect(() => {
    if (paused) return undefined;
    const startedAt = performance.now();
    const timer = setTimeout(next, remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(0, remainingRef.current - (performance.now() - startedAt));
    };
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

  function onPointerDown() {
    heldRef.current = false;
    holdTimerRef.current = setTimeout(() => {
      heldRef.current = true;
      setPaused(true);
    }, HOLD_MS);
  }

  function onPointerUp(event) {
    clearTimeout(holdTimerRef.current);
    if (heldRef.current) {
      setPaused(false);
      return;
    }
    const { left, width } = event.currentTarget.getBoundingClientRect();
    if (event.clientX - left < width / 3) previous();
    else next();
  }

  function onPointerCancel() {
    clearTimeout(holdTimerRef.current);
    setPaused(false);
  }

  return (
    <div className="story-viewer" role="dialog" aria-modal="true" aria-label={`${friend.name}'s Story`}>
      <div
        className="story-snap"
        style={{ background: snap.background }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onContextMenu={(event) => event.preventDefault()}
      >
        <p className="story-caption">{snap.caption}</p>
      </div>
      <div className={`story-progress${paused ? " is-paused" : ""}`}>
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
