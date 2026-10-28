# Slapchat

A camera-first app for a few friends, inspired by Snapchat circa 2018: snaps, Stories, and chats.

Live at **https://misterkanoodles.github.io/slapchat/**. Every push to `main` builds and deploys through GitHub Actions.

## How it works

- Opens straight to a full-screen camera. Swipe right for **Chats**, left for **Stories**, or tap the buttons beside the shutter.
- Tap the shutter to snap; double-tap the screen to flip cameras. **Use phone camera** opens the native iPhone camera when live camera access isn't available.
- Tap a friend's Story to play it; tap right to skip, left to go back.
- Tap your avatar for the quick guide.

Snaps stay on your device for now. Chats, Stories, and Discover use sample data; there are no accounts or backend yet.

## Add to iPhone Home Screen

Open the live site in Safari → **Share** → **Add to Home Screen** → **Add**. It launches full screen like a native app.

## Develop

Requires Node 20+.

```bash
npm install
npm run dev      # local dev server (also on your LAN with --host)
npm run build    # production build into dist/
```

The camera only streams on `localhost` or HTTPS. To test on a phone, use the deployed site.

## Project layout

```
index.html              Vite entry
public/                 Copied as-is: icon, web manifest, service worker
src/main.jsx            React bootstrap + service worker registration
src/App.jsx             Swipe pager (Chats | Camera | Stories), overlays, toasts
src/components/         One file per screen or overlay
src/hooks/useCamera.js  Camera stream: start, flip, capture
src/data/sampleData.js  Placeholder friends, Stories, Discover
src/styles.css          All styles
```

The service worker is network-first, so installed copies pick up new deploys on the next launch and fall back to the cache offline.

## Working on it

Two agents (Claude and Codex) contribute to this repo. Work on a branch, open a PR into `main`, and keep each PR to one feature or screen so changes don't collide.
