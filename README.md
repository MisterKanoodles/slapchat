# Slapchat

A mobile-first social camera web app inspired by the camera-first Snapchat experience from 2018.

## Try the prototype

The repository contains the app files; it is not yet published as a website. To try it on iPhone, first host the site over HTTPS, then open that site in Safari. Tap **How to use** or **Help** for the in-app guide. Camera access requires HTTPS; if you are opening a local preview, choose **Use iPhone camera**.

The camera is a demo: captured photos appear only as a preview on your device. Chats, Stories, and Discover use sample content; there is no account system or message sharing yet.

## Add to iPhone Home Screen

1. Open the live website in **Safari**.
2. Tap **Share**.
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.

The site includes iPhone safe-area layout, a home-screen manifest, and offline shell caching after the first visit.

## Run locally

Open `index.html` in a modern browser. No build step or dependencies are required. Camera streaming works only from a secure context (HTTPS or localhost).

## Current prototype features

- Camera-first mobile layout with labeled navigation and touch-sized controls
- Live camera preview with front/back camera switching when supported
- Native iPhone photo capture fallback and on-device snap preview
- In-app instructions for camera, Stories, Chats, and iPhone installation
- Sample Stories, friends, streaks, and Discover content
- No sign-in, persistent messaging, backend, or social account data
