import { discover, friendById, stories } from "../data/sampleData.js";

export default function StoriesScreen({ seenIds, onBack, onOpenStory, showToast }) {
  return (
    <section className="panel" aria-labelledby="storiesTitle">
      <header className="panel-header">
        <button type="button" className="panel-back" aria-label="Back to camera" onClick={onBack}>◉</button>
        <h2 id="storiesTitle">Stories</h2>
      </header>

      <h3 className="panel-subhead">Friends</h3>
      <ul className="story-list">
        <li>
          <button type="button" className="story-row" onClick={() => showToast("Posting to My Story is coming soon.")}>
            <span className="story-ring is-mine"><span className="story-avatar">＋</span></span>
            <span className="chat-copy"><b>My Story</b><small>Add a snap</small></span>
          </button>
        </li>
        {stories.map((story) => {
          const friend = friendById(story.friendId);
          const seen = story.seen || seenIds.has(story.friendId);
          return (
            <li key={story.friendId}>
              <button type="button" className="story-row" onClick={() => onOpenStory(story.friendId)}>
                <span className={`story-ring${seen ? " is-seen" : ""}`}><span className="story-avatar">{friend.emoji}</span></span>
                <span className="chat-copy">
                  <b>{friend.name}</b>
                  <small>{story.snaps.length} {story.snaps.length === 1 ? "snap" : "snaps"}{seen ? " · seen" : ""}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <h3 className="panel-subhead">Discover</h3>
      <div className="discover-grid">
        {discover.map((item) => (
          <button
            key={item.title}
            type="button"
            className="discover-tile"
            style={{ background: item.background }}
            onClick={() => showToast("Discover is a preview for now.")}
          >
            <small>{item.tag}</small>
            <b>{item.title}</b>
          </button>
        ))}
      </div>
    </section>
  );
}
