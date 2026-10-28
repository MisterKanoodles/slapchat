# Slapchat

A mobile-first social camera web app inspired by the camera-first Snapchat experience from 2018. This repository currently contains a front-end prototype with sample Stories, friends, streaks, and chat UI.

## Run locally

Open `index.html` in a modern browser. No build step or dependencies are required.

## iPhone setup

Deploy the site over HTTPS, open it in Safari on iPhone, tap **Share**, then **Add to Home Screen**. The app includes iOS safe-area spacing, a camera capture button, a home-screen manifest, and a small offline cache.

## Team workflow

Create feature branches for changes and open pull requests so teammates can review them before merging.

## Current prototype

- Responsive camera-first layout with desktop side panels and iPhone bottom navigation
- iOS-aware viewport sizing, notch and home-indicator spacing, and large touch targets
- Sample Stories, friend activity, chats, streaks, and Discover content
- Camera button opens the phone’s photo capture flow; snaps are previewed in the UI
- Offline shell caching after the first visit
- No sign-in, persistent messaging, backend, or real social account data yet
