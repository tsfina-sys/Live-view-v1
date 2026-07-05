const demoUsers = [
  { id: 1, name: "Άννα", area: "Σύνταγμα, Αθήνα", lat: 37.9754, lng: 23.7348, status: "available", distance: "1,2 km" },
  { id: 2, name: "Μάριος", area: "Μοναστηράκι, Αθήνα", lat: 37.9769, lng: 23.7258, status: "available", distance: "1,8 km" },
  { id: 3, name: "Ελένη", area: "Κουκάκι, Αθήνα", lat: 37.9628, lng: 23.7241, status: "busy", distance: "2,6 km" },
  { id: 4, name: "Νίκος", area: "Παγκράτι, Αθήνα", lat: 37.9694, lng: 23.7508, status: "available", distance: "3,1 km" }
];

let selectedUser = null;
let currentStream = null;
let facingMode = "environment";
let myExactMarker = null;
let myPublicMarker = null;
let searchMarker = null;
let isAvailable = false;
let myCoordinates = null;
let searchAbortController = null;
let searchTimer = null;
let deferredInstallPrompt = null;

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [23.7, 38.0],
  zoom: 1.35,
  minZoom: 0.5,
  maxZoom: 18,
  attributionControl: true,
  renderWorldCopies: false
});

map.addControl(new maplibregl.NavigationControl({ showCompass: false, showZoom: false }), "bottom-right");

const startScreen = document.getElementById("startScreen");
const enterAppBtn = document.getElementById("enterAppBtn");
const availabilityBtn = document.getElementById("availabilityBtn");
const statusLabel = availabilityBtn.querySelector(".status-label");
const installBtn = document.getElementById("installBtn");
const searchForm = document.getElementById("searchForm");
const placeSearch = document.getElementById("placeSearch");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchResults = document.getElementById("searchResults");
const globeBtn = document.getElementById("globeBtn");
const locateBtn = document.getElementById("locateBtn");
const focusLocationBtn = document.getElementById("focusLocationBtn");
const cameraBtn = document.getElementById("cameraBtn");
const peopleBtn = document.getElementById("peopleBtn");
const locationCard = document.getElementById("locationCard");
const locationTitle = document.getElementById("locationTitle");
const locationDetails = document.getElementById("locationDetails");
const locationSymbol = document.getElementById("locationSymbol");
const peopleDialog = document.getElementById("peopleDialog");
const closePeopleBtn = document.getElementById("closePeopleBtn");
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
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}

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
  if (!isRunningAsInstalledApp()) installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.hidden = true;
    showToast(choice.outcome === "accepted" ? "Η εγκατάσταση ξεκίνησε." : "Η εγκατάσταση ακυρώθηκε.");
    return;
  }

  showToast(
    isIosDevice()
      ? "Safari: Κοινοποίηση → Προσθήκη στην οθόνη Αφετηρίας."
      : "Chrome ⋮ → Εγκατάσταση εφαρμογής."
  );
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installBtn.hidden = true;
  showToast("Το LiveView εγκαταστάθηκε.");
});

if (!isRunningAsInstalledApp() && isIosDevice()) installBtn.hidden = false;

map.on("style.load", () => {
  map.setProjection({ type: "globe" });
});

map.on("load", () => {
  demoUsers.forEach(createUserMarker);
  renderUsers();
});


enterAppBtn.addEventListener("click", async () => {
  enterAppBtn.disabled = true;
  startScreen.classList.add("leaving");

  window.setTimeout(() => {
    startScreen.hidden = true;
  }, 500);

  await requestMyLocation({ keepGlobeView: true, silentFailure: false });
});

function createUserMarker(user) {
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
    card.querySelector(".request-btn").addEventListener("click", () => openRequest(user));
    list.appendChild(card);
  });

  onlineCount.textContent = `${demoUsers.filter(user => user.status === "available").length} διαθέσιμοι`;
}

function openRequest(user) {
  if (user.status === "busy") {
    showToast("Ο χρήστης βρίσκεται ήδη σε μετάδοση.");
    return;
  }

  if (peopleDialog.open) peopleDialog.close();
  selectedUser = user;
  requestName.textContent = `Αίτημα προς ${user.name}`;
  requestLocation.textContent = user.area;
  requestAvatar.textContent = user.name.charAt(0);
  requestMessage.value = "";
  requestDialog.showModal();
}

function updateLocationCard({ title, details, ready = false, error = false }) {
  locationTitle.textContent = title;
  locationDetails.textContent = details;
  locationCard.classList.toggle("ready", ready);
  locationSymbol.textContent = error ? "!" : ready ? "●" : "◎";
}

function formatCoordinates(latitude, longitude) {
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}

function createExactLocationMarker(longitude, latitude) {
  if (myExactMarker) myExactMarker.remove();

  const el = document.createElement("div");
  el.className = "marker me";
  el.title = "Η ακριβής θέση σου — ορατή μόνο σε εσένα";

  myExactMarker = new maplibregl.Marker({ element: el })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

function requestMyLocation({ keepGlobeView = true, silentFailure = false } = {}) {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      updateLocationCard({
        title: "Δεν υποστηρίζεται GPS",
        details: "Η συσκευή ή ο browser δεν παρέχει γεωεντοπισμό.",
        error: true
      });
      resolve(false);
      return;
    }

    updateLocationCard({
      title: "Εντοπισμός θέσης…",
      details: "Περίμενε ή επίτρεψε την πρόσβαση στο GPS."
    });

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy || 0);

        myCoordinates = { latitude, longitude, accuracy };
        createExactLocationMarker(longitude, latitude);

        updateLocationCard({
          title: formatCoordinates(latitude, longitude),
          details: accuracy ? `Ακρίβεια περίπου ±${accuracy} m` : "Η θέση εντοπίστηκε.",
          ready: true
        });

        map.easeTo({
          center: [longitude, latitude],
          zoom: keepGlobeView ? 1.8 : 14,
          duration: 1800
        });

        resolve(true);
      },
      error => {
        if (!silentFailure) {
          const denied = error.code === error.PERMISSION_DENIED;
          updateLocationCard({
            title: denied ? "Δεν δόθηκε άδεια τοποθεσίας" : "Αδυναμία εντοπισμού",
            details: denied
              ? "Πάτησε ◎ και επίτρεψε την τοποθεσία από τις ρυθμίσεις."
              : "Έλεγξε ότι το GPS είναι ενεργό και δοκίμασε ξανά.",
            error: true
          });
          showToast(denied ? "Χρειάζεται άδεια τοποθεσίας." : "Δεν βρέθηκε η θέση σου.");
        }
        resolve(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 15000
      }
    );
  });
}

function focusOnMyLocation() {
  if (!myCoordinates) {
    requestMyLocation({ keepGlobeView: false });
    return;
  }

  map.flyTo({
    center: [myCoordinates.longitude, myCoordinates.latitude],
    zoom: 14,
    duration: 1800
  });
}

function privacyOffset(value) {
  return value + (Math.random() - 0.5) * 0.009;
}

availabilityBtn.addEventListener("click", async () => {
  if (!isAvailable) {
    const located = myCoordinates || await requestMyLocation({ keepGlobeView: false });
    if (!located && !myCoordinates) return;

    const publicLongitude = privacyOffset(myCoordinates.longitude);
    const publicLatitude = privacyOffset(myCoordinates.latitude);
    const el = document.createElement("div");
    el.className = "marker";
    el.textContent = "Ε";
    el.title = "Η προσεγγιστική δημόσια θέση σου";

    if (myPublicMarker) myPublicMarker.remove();
    myPublicMarker = new maplibregl.Marker({ element: el })
      .setLngLat([publicLongitude, publicLatitude])
      .addTo(map);

    isAvailable = true;
    availabilityBtn.classList.add("active");
    availabilityBtn.setAttribute("aria-pressed", "true");
    statusLabel.textContent = "Διαθέσιμος";
    showToast("Εμφανίζεσαι με προσεγγιστική θέση.");
    return;
  }

  isAvailable = false;
  availabilityBtn.classList.remove("active");
  availabilityBtn.setAttribute("aria-pressed", "false");
  statusLabel.textContent = "Μη διαθέσιμος";

  if (myPublicMarker) {
    myPublicMarker.remove();
    myPublicMarker = null;
  }
  showToast("Δεν εμφανίζεσαι πλέον ως διαθέσιμος.");
});

globeBtn.addEventListener("click", () => {
  searchResults.hidden = true;
  map.flyTo({
    center: myCoordinates
      ? [myCoordinates.longitude, myCoordinates.latitude]
      : [23.7, 38.0],
    zoom: 1.35,
    bearing: 0,
    pitch: 0,
    duration: 1800
  });
});

locateBtn.addEventListener("click", () => requestMyLocation({ keepGlobeView: false }));
focusLocationBtn.addEventListener("click", focusOnMyLocation);

peopleBtn.addEventListener("click", () => peopleDialog.showModal());
closePeopleBtn.addEventListener("click", () => peopleDialog.close());

function setSearchMessage(message) {
  searchResults.innerHTML = `<div class="search-message">${message}</div>`;
  searchResults.hidden = false;
}

async function searchPlaces(query) {
  const cleanQuery = query.trim();

  if (cleanQuery.length < 2) {
    searchResults.hidden = true;
    return;
  }

  if (searchAbortController) searchAbortController.abort();
  searchAbortController = new AbortController();

  setSearchMessage("Αναζήτηση…");

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "6");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "el,en");
  url.searchParams.set("q", cleanQuery);

  try {
    const response = await fetch(url, {
      signal: searchAbortController.signal,
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const results = await response.json();
    renderSearchResults(results);
  } catch (error) {
    if (error.name === "AbortError") return;
    setSearchMessage("Η αναζήτηση δεν είναι διαθέσιμη αυτή τη στιγμή.");
  }
}

function renderSearchResults(results) {
  searchResults.innerHTML = "";

  if (!Array.isArray(results) || results.length === 0) {
    setSearchMessage("Δεν βρέθηκε τοποθεσία.");
    return;
  }

  results.forEach(result => {
    const latitude = Number(result.lat);
    const longitude = Number(result.lon);
    const label = result.display_name || "Άγνωστη τοποθεσία";
    const parts = label.split(",");
    const primary = parts.shift()?.trim() || label;
    const secondary = parts.join(",").trim();

    const button = document.createElement("button");
    button.type = "button";
    button.className = "search-result";
    button.setAttribute("role", "option");
    button.innerHTML = `
      <span class="result-pin">📍</span>
      <span class="result-copy">
        <strong>${escapeHtml(primary)}</strong>
        <small>${escapeHtml(secondary)}</small>
      </span>
    `;

    button.addEventListener("click", () => {
      selectSearchResult({ latitude, longitude, label, primary });
    });

    searchResults.appendChild(button);
  });

  searchResults.hidden = false;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function selectSearchResult({ latitude, longitude, label, primary }) {
  placeSearch.value = primary;
  clearSearchBtn.hidden = false;
  searchResults.hidden = true;

  if (searchMarker) searchMarker.remove();

  const el = document.createElement("div");
  el.className = "marker search-marker";
  el.textContent = "⌖";
  el.title = label;

  searchMarker = new maplibregl.Marker({ element: el })
    .setLngLat([longitude, latitude])
    .addTo(map);

  map.flyTo({
    center: [longitude, latitude],
    zoom: 11.5,
    duration: 1900
  });
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  clearTimeout(searchTimer);
  searchPlaces(placeSearch.value);
});

placeSearch.addEventListener("input", () => {
  const query = placeSearch.value.trim();
  clearSearchBtn.hidden = query.length === 0;
  clearTimeout(searchTimer);

  if (query.length < 2) {
    searchResults.hidden = true;
    return;
  }

  searchTimer = setTimeout(() => searchPlaces(query), 500);
});

placeSearch.addEventListener("focus", () => {
  if (searchResults.children.length && placeSearch.value.trim().length >= 2) {
    searchResults.hidden = false;
  }
});

clearSearchBtn.addEventListener("click", () => {
  placeSearch.value = "";
  clearSearchBtn.hidden = true;
  searchResults.hidden = true;
  if (searchMarker) {
    searchMarker.remove();
    searchMarker = null;
  }
  placeSearch.focus();
});

document.addEventListener("pointerdown", event => {
  if (!event.target.closest(".search-wrap")) searchResults.hidden = true;
});

sendRequestBtn.addEventListener("click", event => {
  event.preventDefault();
  if (!selectedUser) return;

  requestDialog.close();
  showToast(`Το δοκιμαστικό αίτημα προς ${selectedUser.name} στάλθηκε για ${requestDuration.value} λεπτά.`);
  selectedUser = null;
});

async function startCamera() {
  cameraError.hidden = true;
  cameraPreview.hidden = false;

  if (!navigator.mediaDevices?.getUserMedia) {
    cameraPreview.hidden = true;
    cameraError.hidden = false;
    cameraError.textContent = "Η κάμερα απαιτεί σύγχρονο browser και ασφαλή σύνδεση HTTPS.";
    return;
  }

  stopCamera(false);

  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: facingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Η εφαρμογή συνεχίζει να λειτουργεί χωρίς offline cache.
    });
  });
}
