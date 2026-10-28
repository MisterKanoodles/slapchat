import { useEffect, useRef, useState } from "react";
import { useCamera } from "../hooks/useCamera.js";

const statusMessages = {
  unsupported: "Live camera needs the HTTPS site. You can still use your phone's camera.",
  denied: "Camera access was blocked. Allow it in Settings, or use your phone's camera."
};

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z" /></svg>
  );
}

function StoriesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" /></svg>
  );
}

export default function CameraScreen({ onOpenChats, onOpenStories, onOpenHelp, showToast }) {
  const { videoRef, status, facing, start, flip, capture } = useCamera();
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  // Revoke object URLs from the native picker once they're replaced.
  useEffect(() => () => {
    if (photo?.startsWith("blob:")) URL.revokeObjectURL(photo);
  }, [photo]);

  function openNativeCamera() {
    fileInputRef.current?.click();
  }

  function takeSnap() {
    if (status !== "live") {
      openNativeCamera();
      return;
    }
    const dataUrl = capture();
    if (dataUrl) setPhoto(dataUrl);
  }

  async function flipCamera() {
    const next = await flip();
    if (status !== "live") showToast(next === "user" ? "Front camera" : "Back camera");
  }

  function onFileChosen(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) setPhoto(URL.createObjectURL(file));
  }

  function saveSnap() {
    const link = document.createElement("a");
    link.href = photo;
    link.download = `slapchat-${Date.now()}.jpg`;
    link.click();
  }

  const isLive = status === "live";

  return (
    <section className="camera-screen" aria-label="Camera" onDoubleClick={isLive && !photo ? flipCamera : undefined}>
      {!isLive && <div className="camera-placeholder" aria-hidden="true" />}
      <video
        ref={videoRef}
        className={`camera-video${facing === "user" ? " is-mirrored" : ""}`}
        autoPlay
        muted
        playsInline
        hidden={!isLive}
      />

      {photo ? (
        <div className="snap-preview">
          <img src={photo} alt="Your snap" />
          <button type="button" className="icon-button preview-close" aria-label="Discard snap" onClick={() => setPhoto(null)}>✕</button>
          <div className="preview-actions">
            <button type="button" className="icon-button" aria-label="Save snap" onClick={saveSnap}>⤓</button>
            <button type="button" className="send-button" onClick={() => showToast("Sending snaps is coming soon.")}>
              Send To <span aria-hidden="true">➤</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="camera-top">
            <button type="button" className="avatar-button" aria-label="Profile and help" onClick={onOpenHelp}>
              <span aria-hidden="true">🧑🏽</span>
            </button>
            <button type="button" className="icon-button" aria-label="Switch camera" onClick={flipCamera}>⟲</button>
          </header>

          {!isLive && (
            <div className="camera-intro">
              <img src="./icon.svg?v=3" alt="" className="camera-intro-logo" />
              <h1>Catch the moment.</h1>
              <p>{statusMessages[status] ?? "Turn on the camera to start snapping."}</p>
              <div className="camera-intro-actions">
                {status !== "unsupported" && (
                  <button type="button" className="button-primary" onClick={() => start()} disabled={status === "starting"}>
                    {status === "starting" ? "Starting…" : "Turn on camera"}
                  </button>
                )}
                <button type="button" className="button-glass" onClick={openNativeCamera}>Use phone camera</button>
              </div>
            </div>
          )}

          <footer className="camera-bottom">
            <button type="button" className="nav-pill" onClick={onOpenChats}>
              <ChatIcon />Chats
            </button>
            <button type="button" className="shutter" aria-label="Take a snap" onClick={takeSnap} />
            <button type="button" className="nav-pill" onClick={onOpenStories}>
              <StoriesIcon />Stories
            </button>
          </footer>
        </>
      )}

      <input
        ref={fileInputRef}
        className="visually-hidden"
        type="file"
        accept="image/*"
        capture={facing}
        onChange={onFileChosen}
        tabIndex={-1}
        aria-hidden="true"
      />
    </section>
  );
}
