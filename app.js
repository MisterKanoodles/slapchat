const friends = [
  { emoji: "👩🏻", name: "Maya", message: "😂 that was SO good · 2m", color: "maya" },
  { emoji: "🧑🏾", name: "Jordan", message: "Sent you a snap · just now", color: "jordan" },
  { emoji: "🧔🏻", name: "Luca", message: "streak check?", color: "luca" },
  { emoji: "👩🏽", name: "Sam", message: "🔥 sent a snap", color: "sam" },
  { emoji: "👨🏼", name: "Ari", message: "Opened · 1h", color: "jordan" }
];
let toastTimeout;
let cameraStream = null;
let facingMode = "user";
let photoUrl = null;

const stage = document.getElementById("cameraStage");
const video = document.getElementById("cameraVideo");
const photoInput = document.getElementById("photoInput");
const capturedPhoto = document.getElementById("capturedPhoto");

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 2300);
}

function openOverlay(id) {
  document.getElementById(id).hidden = false;
  document.body.style.overflow = "hidden";
}

function closeOverlay(id) {
  document.getElementById(id).hidden = true;
  document.body.style.overflow = "";
}

function openHelp() {
  openOverlay("helpOverlay");
}

function openChats() {
  const list = document.getElementById("chatList");
  list.innerHTML = friends.map((friend) => (
    '<div class="chat-row">' +
      '<span class="friend-avatar ' + friend.color + '">' + friend.emoji + '</span>' +
      '<span><b>' + friend.name + '</b><small>' + friend.message + '</small></span>' +
    '</div>'
  )).join("");
  openOverlay("chatOverlay");
}

function viewStory(name) {
  showToast(name + "'s sample Story · more coming soon.");
}

async function startCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    showToast("Camera access needs the live website. Try Use iPhone camera.");
    return;
  }

  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 1600 }
      },
      audio: false
    });
    video.srcObject = cameraStream;
    await video.play();
    stage.classList.add("is-live");
  } catch (error) {
    showToast("Camera unavailable. Try Use iPhone camera instead.");
  }
}

async function flipCamera() {
  facingMode = facingMode === "user" ? "environment" : "user";
  photoInput.setAttribute("capture", facingMode);

  if (!cameraStream) {
    showToast(facingMode === "user" ? "Front camera selected." : "Back camera selected.");
    return;
  }

  cameraStream.getTracks().forEach((track) => track.stop());
  cameraStream = null;
  stage.classList.remove("is-live");
  await startCamera();
}

function usePhoneCamera() {
  photoInput.click();
}

function takeSnap() {
  if (!cameraStream) {
    usePhoneCamera();
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  capturedPhoto.src = canvas.toDataURL("image/jpeg", 0.9);
  stage.classList.remove("is-live");
  stage.classList.add("has-photo");
}

function retakePhoto() {
  stage.classList.remove("has-photo");
  capturedPhoto.removeAttribute("src");
  photoInput.value = "";

  if (cameraStream) {
    stage.classList.add("is-live");
  }
}

photoInput.addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = URL.createObjectURL(file);
  capturedPhoto.src = photoUrl;
  stage.classList.add("has-photo");
  showToast("Snap preview ready. Nothing was sent.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOverlay("helpOverlay");
    closeOverlay("chatOverlay");
  }
});

document.querySelector(".shutter").addEventListener("click", takeSnap);

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}