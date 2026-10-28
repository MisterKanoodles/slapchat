import { useCallback, useEffect, useRef, useState } from "react";

// Owns the getUserMedia stream for the camera screen.
// status: "off" | "starting" | "live" | "unsupported" | "denied"
export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(0);
  const [status, setStatus] = useState("off");
  const [facing, setFacing] = useState("user");

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const start = useCallback(async (facingMode = facing) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return false;
    }
    stopStream();
    setStatus("starting");
    const request = ++requestRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facingMode }, width: { ideal: 1920 }, height: { ideal: 1920 } },
        audio: false
      });
      // A newer start() (or unmount) superseded this one; don't leave its camera running.
      if (request !== requestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setStatus("live");
      return true;
    } catch {
      if (request !== requestRef.current) return false;
      setStatus("denied");
      return false;
    }
  }, [facing, stopStream]);

  const flip = useCallback(async () => {
    const next = facing === "user" ? "environment" : "user";
    setFacing(next);
    if (streamRef.current) await start(next);
    return next;
  }, [facing, start]);

  // Returns a JPEG data URL of the current frame, mirrored to match the selfie preview.
  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video || !streamRef.current || !video.videoWidth) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (facing === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.9);
  }, [facing]);

  // Start straight into the camera when permission was already granted, like a native app.
  useEffect(() => {
    navigator.permissions?.query({ name: "camera" })
      .then((result) => { if (result.state === "granted") start(); })
      .catch(() => {});
  }, []);

  // iOS ends the stream when the app is backgrounded; restart it on return.
  useEffect(() => {
    function onVisibility() {
      if (document.visibilityState !== "visible" || !streamRef.current) return;
      const ended = streamRef.current.getVideoTracks().every((track) => track.readyState === "ended");
      if (ended) start();
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [start]);

  useEffect(() => () => {
    requestRef.current++;
    stopStream();
  }, [stopStream]);

  return { videoRef, status, facing, start, flip, capture };
}
