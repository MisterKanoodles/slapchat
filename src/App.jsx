import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import CameraScreen from "./components/CameraScreen.jsx";
import ChatsScreen from "./components/ChatsScreen.jsx";
import HelpSheet from "./components/HelpSheet.jsx";
import InstallHint from "./components/InstallHint.jsx";
import StoriesScreen from "./components/StoriesScreen.jsx";
import StoryViewer from "./components/StoryViewer.jsx";

// Swipeable pages, left to right, like the 2018 app: Chats ← Camera → Stories.
const PAGES = { chats: 0, camera: 1, stories: 2 };

export default function App() {
  const pagerRef = useRef(null);
  const pageRef = useRef(PAGES.camera);
  const toastTimer = useRef(null);
  const [toast, setToast] = useState("");
  const [helpOpen, setHelpOpen] = useState(false);
  const [openStoryId, setOpenStoryId] = useState(null);
  const [seenIds, setSeenIds] = useState(() => new Set());

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2300);
  }, []);

  const goTo = useCallback((page, behavior = "smooth") => {
    const pager = pagerRef.current;
    if (!pager) return;
    pageRef.current = page;
    pager.scrollTo({ left: page * pager.clientWidth, behavior });
  }, []);

  // Open on the camera, and stay on the current page through rotation/resizes.
  useLayoutEffect(() => {
    goTo(PAGES.camera, "instant");
    const onResize = () => goTo(pageRef.current, "instant");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [goTo]);

  useEffect(() => {
    const pager = pagerRef.current;
    const onScroll = () => {
      pageRef.current = Math.round(pager.scrollLeft / pager.clientWidth);
    };
    pager.addEventListener("scroll", onScroll, { passive: true });
    return () => pager.removeEventListener("scroll", onScroll);
  }, []);

  const markSeen = useCallback((friendId) => {
    setSeenIds((current) => (current.has(friendId) ? current : new Set(current).add(friendId)));
  }, []);

  const closeStory = useCallback(() => setOpenStoryId(null), []);
  const closeHelp = useCallback(() => setHelpOpen(false), []);

  return (
    <div className="app">
      <main className="pager" ref={pagerRef}>
        <div className="page">
          <ChatsScreen onBack={() => goTo(PAGES.camera)} showToast={showToast} />
        </div>
        <div className="page">
          <CameraScreen
            onOpenChats={() => goTo(PAGES.chats)}
            onOpenStories={() => goTo(PAGES.stories)}
            onOpenHelp={() => setHelpOpen(true)}
            showToast={showToast}
          />
        </div>
        <div className="page">
          <StoriesScreen
            seenIds={seenIds}
            onBack={() => goTo(PAGES.camera)}
            onOpenStory={setOpenStoryId}
            showToast={showToast}
          />
        </div>
      </main>

      <InstallHint />
      {openStoryId && <StoryViewer friendId={openStoryId} onClose={closeStory} onSeen={markSeen} />}
      {helpOpen && <HelpSheet onClose={closeHelp} />}
      <div className="rotate-hint" aria-hidden="true">Turn your phone upright to use Slapchat.</div>
      <div className={`toast${toast ? " is-visible" : ""}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}
