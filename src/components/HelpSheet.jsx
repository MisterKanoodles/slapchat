import { useEffect } from "react";

const steps = [
  ["Take a snap", "Turn on the camera and tap the big circle. Double-tap the screen to flip cameras."],
  ["Swipe around", "Swipe right for Chats, left for Stories. Swipe back to return to the camera."],
  ["Watch Stories", "Tap a friend to play their Story. Tap right to skip, left to go back, and press and hold to pause."],
  ["Add to Home Screen", "In Safari, tap Share, then Add to Home Screen. Slapchat opens full screen like an app."],
  ["Save a snap", "After snapping, tap the save button and choose Save Image to put it in Photos."]
];

export default function HelpSheet({ onClose }) {
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="sheet-backdrop" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section className="bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="helpTitle">
        <header className="sheet-heading">
          <h2 id="helpTitle">How Slapchat works</h2>
          <button type="button" className="close-button" aria-label="Close guide" onClick={onClose}>✕</button>
        </header>
        <ol className="guide">
          {steps.map(([title, body]) => (
            <li key={title}><b>{title}</b><p>{body}</p></li>
          ))}
        </ol>
        <p className="panel-note">This is an early demo. Snaps stay on your phone and the chats and Stories are samples.</p>
      </section>
    </div>
  );
}
