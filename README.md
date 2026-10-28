# Slapchat

A mobile-first camera and Stories prototype inspired by the camera-first Snapchat experience from 2018.

## Try the prototype

The repository contains the app files; it is not yet published as a website. After it is hosted over HTTPS, open it in Safari on iPhone and tap **How it works** or **Help** for the in-app guide. Camera access requires HTTPS; **Use iPhone camera** opens the native photo capture flow.

The camera is a demo: captured photos appear only as a preview on your device. Chats and Stories use sample content; there is no sign-in, messaging, or backend yet.

## Add to iPhone Home Screen

1. Open the live website in Safari.
2. Tap **Share**.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

## Work on the project

Open `index.html` in a modern browser. No build step or dependencies are required. Keep page structure in `index.html`, visual styles in `styles.css`, and interactions in `app.js`.

## Prototype features

- iPhone safe-area layout and labeled touch navigation
- Live camera preview with front/back switching when supported
- Native iPhone photo capture fallback and local snap preview
- In-app guide for the camera, Stories, chats, and installation
- Sample Stories, friends, streaks, and Discover content
- Home-screen manifest and offline shell caching
