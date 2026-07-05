const demoUsers = [
  { id: 1, name: "Άννα", area: "Σύνταγμα, Αθήνα", lat: 37.9754, lng: 23.7348, status: "available", distance: "1,2 km" },
  { id: 2, name: "Μάριος", area: "Μοναστηράκι, Αθήνα", lat: 37.9769, lng: 23.7258, status: "available", distance: "1,8 km" },
  { id: 3, name: "Ελένη", area: "Κουκάκι, Αθήνα", lat: 37.9628, lng: 23.7241, status: "busy", distance: "2,6 km" },
  { id: 4, name: "Νίκος", area: "Παγκράτι, Αθήνα", lat: 37.9694, lng: 23.7508, status: "available", distance: "3,1 km" }
];

let selectedUser = null;
let currentStream = null;
let facingMode = "environment";
let myMarker = null;
let isAvailable = false;

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [23.7348, 37.9755],
  zoom: 12.3,
  attributionControl: true
});

map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "bottom-right");

const availabilityBtn = document.getElementById("availabilityBtn");
const installBtn = document.getElementById("installBtn");
const locateBtn = document.getElementById("locateBtn");
const cameraBtn = document.getElementById("cameraBtn");
const requestDialog = document.getElementById("requestDialog");
const requestName = document.getElementById("requestName");
const requestLocation = document.getElementById("requestLocation");
const requestAvatar = document.getElementById("requestAvatar");
const requestMessage = document.getElementById("requestMessage");
const requestDuration = document.getElementById("requestDuration");
const sendRequestBtn = document.getElementById("sendRequestBtn");
const cameraDialog = document.getElementById("cameraDialog");
const cameraPreview = document.getElementById("cameraPreview");
const cameraError = document.getElementById("cameraError");
const closeCameraBtn = document.getElementById("closeCameraBtn");
const stopCameraBtn = document.getElementById("stopCameraBtn");
const switchCameraBtn = document.getElementById("switchCameraBtn");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
}


let deferredInstallPrompt = null;

function isRunningAsInstalledApp() {
  return window.matchMedia("(display-mode: standalone)").matches ||
         window.matchMedia("(display-mode: fullscreen)").matches ||
         window.navigator.standalone === true;
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (!isRunningAsInstalledApp()) {
    installBtn.hidden = false;
  }
});

installBtn.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.hidden = true;

    if (choice.outcome === "accepted") {
      showToast("Η εγκατάσταση του LiveView ξεκίνησε.");
    } else {
      showToast("Η εγκατάσταση ακυρώθηκε.");
    }
    return;
  }

  if (isIosDevice()) {
    showToast("Στο Safari: Κοινοποίηση → Προσθήκη στην οθόνη Αφετηρίας.");
  } else {
    showToast("Chrome ⋮ → Εγκατάσταση εφαρμογής. Αν υπάρχει παλιά συντόμευση, διέγραψέ την πρώτα.");
  }
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installBtn.hidden = true;
  showToast("Το LiveView εγκαταστάθηκε ως εφαρμογή.");
});

if (isRunningAsInstalledApp()) {
  installBtn.hidden = true;
} else if (isIosDevice()) {
  installBtn.hidden = false;
}


function createMarker(user) {
  const el = document.createElement("button");
  el.className = `marker ${user.status === "busy" ? "busy" : ""}`;
  el.type = "button";
  el.textContent = user.name.charAt(0);
  el.title = `${user.name} — ${user.area}`;
  el.addEventListener("click", () => openRequest(user));

  new maplibregl.Marker({ element: el })
    .setLngLat([user.lng, user.lat])
    .addTo(map);
}

function renderUsers() {
  const list = document.getElementById("userList");
  const onlineCount = document.getElementById("onlineCount");
  list.innerHTML = "";

  demoUsers.forEach(user => {
    const card = document.createElement("article");
    card.className = "user-card";
    card.innerHTML = `
      <div class="avatar">${user.name.charAt(0)}</div>
      <div class="user-main">
        <strong>${user.name}</strong>
        <small>${user.area} · ${user.distance}</small>
      </div>
      <button class="request-btn" ${user.status === "busy" ? "disabled" : ""}>
        ${user.status === "busy" ? "Σε μετάδοση" : "Αίτημα"}
      </button>
    `;
    const button = card.querySelector(".request-btn");
    button.addEventListener("click", () => openRequest(user));
    list.appendChild(card);
  });

  onlineCount.textContent = `${demoUsers.filter(u => u.status === "available").length} online`;
}

function openRequest(user) {
  if (user.status === "busy") {
    showToast("Ο χρήστης βρίσκεται ήδη σε μετάδοση.");
    return;
  }
  selectedUser = user;
  requestName.textContent = `Αίτημα προς ${user.name}`;
  requestLocation.textContent = user.area;
  requestAvatar.textContent = user.name.charAt(0);
  requestMessage.value = "";
  requestDialog.showModal();
}

availabilityBtn.addEventListener("click", async () => {
  if (!isAvailable) {
    await locateMe(true);
    isAvailable = true;
    availabilityBtn.classList.add("active");
    availabilityBtn.setAttribute("aria-pressed", "true");
    availabilityBtn.lastChild.textContent = " Διαθέσιμος";
    showToast("Εμφανίζεσαι ως διαθέσιμος με προσεγγιστική θέση.");
  } else {
    isAvailable = false;
    availabilityBtn.classList.remove("active");
    availabilityBtn.setAttribute("aria-pressed", "false");
    availabilityBtn.lastChild.textContent = " Μη διαθέσιμος";
    if (myMarker) {
      myMarker.remove();
      myMarker = null;
    }
    showToast("Δεν εμφανίζεσαι πλέον στον χάρτη.");
  }
});

function privacyOffset(value) {
  // Demo only: shifts the public marker roughly a few hundred metres.
  return value + (Math.random() - 0.5) * 0.009;
}

function locateMe(forAvailability = false) {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      showToast("Η συσκευή δεν υποστηρίζει γεωεντοπισμό.");
      resolve(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const exactLng = pos.coords.longitude;
        const exactLat = pos.coords.latitude;
        map.flyTo({ center: [exactLng, exactLat], zoom: 14 });

        if (forAvailability) {
          const publicLng = privacyOffset(exactLng);
          const publicLat = privacyOffset(exactLat);
          const el = document.createElement("div");
          el.className = "marker me";
          el.textContent = "Ε";
          el.title = "Η προσεγγιστική δημόσια θέση σου";
          if (myMarker) myMarker.remove();
          myMarker = new maplibregl.Marker({ element: el })
            .setLngLat([publicLng, publicLat])
            .addTo(map);
        }
        resolve(true);
      },
      err => {
        const reason = err.code === 1
          ? "Δεν δόθηκε άδεια τοποθεσίας."
          : "Δεν ήταν δυνατός ο εντοπισμός θέσης.";
        showToast(reason);
        resolve(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 15000 }
    );
  });
}

locateBtn.addEventListener("click", () => locateMe(false));

sendRequestBtn.addEventListener("click", event => {
  event.preventDefault();
  if (!selectedUser) return;

  const duration = requestDuration.value;
  requestDialog.close();
  showToast(`Το δοκιμαστικό αίτημα προς ${selectedUser.name} στάλθηκε για ${duration} λεπτά.`);
  selectedUser = null;
});

async function startCamera() {
  cameraError.hidden = true;
  cameraPreview.hidden = false;

  if (!navigator.mediaDevices?.getUserMedia) {
    cameraPreview.hidden = true;
    cameraError.hidden = false;
    cameraError.textContent = "Η κάμερα απαιτεί σύγχρονο browser και ασφαλή σύνδεση HTTPS ή localhost.";
    return;
  }

  stopCamera(false);

  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: facingMode }, width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    cameraPreview.srcObject = currentStream;
  } catch (error) {
    cameraPreview.hidden = true;
    cameraError.hidden = false;
    cameraError.textContent = error.name === "NotAllowedError"
      ? "Δεν δόθηκε άδεια πρόσβασης στην κάμερα."
      : `Αδυναμία έναρξης κάμερας: ${error.message || error.name}`;
  }
}

function stopCamera(closeDialog = true) {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  cameraPreview.srcObject = null;
  if (closeDialog && cameraDialog.open) cameraDialog.close();
}

cameraBtn.addEventListener("click", async () => {
  cameraDialog.showModal();
  await startCamera();
});

switchCameraBtn.addEventListener("click", async () => {
  facingMode = facingMode === "environment" ? "user" : "environment";
  await startCamera();
});

stopCameraBtn.addEventListener("click", () => stopCamera(true));
closeCameraBtn.addEventListener("click", () => stopCamera(true));
cameraDialog.addEventListener("cancel", event => {
  event.preventDefault();
  stopCamera(true);
});

window.addEventListener("beforeunload", () => stopCamera(false));

demoUsers.forEach(createMarker);
renderUsers();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // The app still works without offline shell caching.
    });
  });
}
