import { useState } from "react";

const DISMISSED_KEY = "slapchat:install-hint-dismissed";

function shouldShow() {
  if (navigator.standalone) return false;
  try {
    return localStorage.getItem(DISMISSED_KEY) !== "1";
  } catch {
    return true;
  }
}

// In Safari (not yet on the Home Screen), explain how to install so it opens full screen.
export default function InstallHint() {
  const [visible, setVisible] = useState(shouldShow);
  if (!visible) return null;

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, "1");
    } catch {
      // Private browsing; the hint just comes back next visit.
    }
  }

  return (
    <aside className="install-hint" role="note">
      <img src="./apple-touch-icon.png?v=4" alt="" />
      <p>
        <b>Add Slapchat to your Home Screen</b>
        Tap <span className="share-glyph" aria-label="Share">⎙</span> then “Add to Home Screen” for the full-screen app.
      </p>
      <button type="button" className="close-button" aria-label="Dismiss" onClick={dismiss}>✕</button>
    </aside>
  );
}
