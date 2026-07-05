const demoUsers = [
  { id: 1, name: "Άννα", area: "Σύνταγμα, Αθήνα", country: "Ελλάδα", lat: 37.9754, lng: 23.7348, status: "available" },
  { id: 2, name: "Μάριος", area: "Μοναστηράκι, Αθήνα", country: "Ελλάδα", lat: 37.9769, lng: 23.7258, status: "available" },
  { id: 3, name: "Ελένη", area: "Θεσσαλονίκη", country: "Ελλάδα", lat: 40.6401, lng: 22.9444, status: "available" },
  { id: 4, name: "Νίκος", area: "Πάτρα", country: "Ελλάδα", lat: 38.2466, lng: 21.7346, status: "available" },
  { id: 5, name: "Γιώργος", area: "Μυτιλήνη", country: "Ελλάδα", lat: 39.1067, lng: 26.5553, status: "available" },
  { id: 6, name: "Μαρία", area: "Χανιά", country: "Ελλάδα", lat: 35.5138, lng: 24.0180, status: "available" },
  { id: 7, name: "Claire", area: "Paris", country: "France", lat: 48.8566, lng: 2.3522, status: "available" },
  { id: 8, name: "James", area: "London", country: "United Kingdom", lat: 51.5074, lng: -0.1278, status: "available" },
  { id: 9, name: "Luca", area: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964, status: "available" },
  { id: 10, name: "Maya", area: "New York", country: "USA", lat: 40.7128, lng: -74.0060, status: "available" },
  { id: 11, name: "Omar", area: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357, status: "available" },
  { id: 12, name: "Aiko", area: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, status: "available" },
  { id: 13, name: "Noah", area: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, status: "available" },
  { id: 14, name: "Rafael", area: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729, status: "available" },
  { id: 15, name: "Layla", area: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, status: "available" },
  { id: 16, name: "Arjun", area: "New Delhi", country: "India", lat: 28.6139, lng: 77.2090, status: "available" },
  { id: 17, name: "Sofia", area: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, status: "available" },
  { id: 18, name: "Daniel", area: "Berlin", country: "Germany", lat: 52.5200, lng: 13.4050, status: "available" }
];

const landmarks = [
  { id: "parthenon", name: "Παρθενώνας", country: "Ελλάδα", lat: 37.9715, lng: 23.7267, minZoom: 1.0, importance: 1, icon: "🏛️", kind: "temple" },
  { id: "eiffel", name: "Πύργος του Άιφελ", country: "Γαλλία", lat: 48.8584, lng: 2.2945, minZoom: 1.0, importance: 1, icon: "🗼", kind: "tower" },
  { id: "liberty", name: "Άγαλμα της Ελευθερίας", country: "ΗΠΑ", lat: 40.6892, lng: -74.0445, minZoom: 1.0, importance: 1, icon: "🗽", kind: "modern" },
  { id: "pyramids", name: "Πυραμίδες Γκίζας", country: "Αίγυπτος", lat: 29.9792, lng: 31.1342, minZoom: 1.0, importance: 1, icon: "🔺", kind: "ancient" },
  { id: "colosseum", name: "Κολοσσαίο", country: "Ιταλία", lat: 41.8902, lng: 12.4922, minZoom: 1.2, importance: 1, icon: "🏟️", kind: "ancient" },
  { id: "bigben", name: "Big Ben", country: "Ηνωμένο Βασίλειο", lat: 51.5007, lng: -0.1246, minZoom: 1.2, importance: 1, icon: "🕰️", kind: "tower" },
  { id: "tajmahal", name: "Taj Mahal", country: "Ινδία", lat: 27.1751, lng: 78.0421, minZoom: 1.2, importance: 1, icon: "🕌", kind: "temple" },
  { id: "greatwall", name: "Σινικό Τείχος", country: "Κίνα", lat: 40.4319, lng: 116.5704, minZoom: 1.2, importance: 1, icon: "🏯", kind: "ancient" },
  { id: "sydneyopera", name: "Όπερα του Σίδνεϊ", country: "Αυστραλία", lat: -33.8568, lng: 151.2153, minZoom: 1.2, importance: 1, icon: "🎭", kind: "modern" },
  { id: "christ", name: "Χριστός Λυτρωτής", country: "Βραζιλία", lat: -22.9519, lng: -43.2105, minZoom: 1.2, importance: 1, icon: "🗿", kind: "modern" },
  { id: "burj", name: "Burj Khalifa", country: "ΗΑΕ", lat: 25.1972, lng: 55.2744, minZoom: 1.2, importance: 1, icon: "🏙️", kind: "tower" },
  { id: "fuji", name: "Όρος Fuji", country: "Ιαπωνία", lat: 35.3606, lng: 138.7274, minZoom: 1.4, importance: 1, icon: "🗻", kind: "mountain" },
  { id: "machupicchu", name: "Machu Picchu", country: "Περού", lat: -13.1631, lng: -72.5450, minZoom: 1.4, importance: 1, icon: "⛰️", kind: "ancient" },

  { id: "meteora", name: "Μετέωρα", country: "Ελλάδα", lat: 39.7217, lng: 21.6306, minZoom: 4.0, importance: 2, icon: "⛰️", kind: "mountain" },
  { id: "knossos", name: "Ανάκτορο Κνωσού", country: "Ελλάδα", lat: 35.2989, lng: 25.1631, minZoom: 4.7, importance: 2, icon: "🏺", kind: "ancient" },
  { id: "white-tower", name: "Λευκός Πύργος", country: "Ελλάδα", lat: 40.6264, lng: 22.9484, minZoom: 5.3, importance: 2, icon: "🏰", kind: "tower" },
  { id: "delphi", name: "Δελφοί", country: "Ελλάδα", lat: 38.4824, lng: 22.5010, minZoom: 5.8, importance: 2, icon: "🏛️", kind: "temple" },
  { id: "olympia", name: "Αρχαία Ολυμπία", country: "Ελλάδα", lat: 37.6384, lng: 21.6300, minZoom: 5.8, importance: 2, icon: "🏟️", kind: "ancient" },
  { id: "sounion", name: "Ναός Ποσειδώνα", country: "Ελλάδα", lat: 37.6500, lng: 24.0240, minZoom: 6.2, importance: 2, icon: "🏛️", kind: "temple" },
  { id: "epidaurus", name: "Αρχαίο Θέατρο Επιδαύρου", country: "Ελλάδα", lat: 37.5964, lng: 23.0790, minZoom: 6.4, importance: 2, icon: "🎭", kind: "ancient" },
  { id: "mystras", name: "Μυστράς", country: "Ελλάδα", lat: 37.0729, lng: 22.3696, minZoom: 6.6, importance: 2, icon: "🏰", kind: "ancient" },
  { id: "navagio", name: "Ναυάγιο Ζακύνθου", country: "Ελλάδα", lat: 37.8594, lng: 20.6247, minZoom: 7.0, importance: 2, icon: "🏖️", kind: "modern" },
  { id: "mytilene-castle", name: "Κάστρο Μυτιλήνης", country: "Ελλάδα", lat: 39.1103, lng: 26.5628, minZoom: 7.1, importance: 2, icon: "🏰", kind: "ancient" },
  { id: "chania-lighthouse", name: "Φάρος Χανίων", country: "Ελλάδα", lat: 35.5195, lng: 24.0167, minZoom: 7.4, importance: 2, icon: "🗼", kind: "tower" },
  { id: "rhodes-palace", name: "Παλάτι Ιπποτών", country: "Ελλάδα", lat: 36.4451, lng: 28.2241, minZoom: 7.4, importance: 2, icon: "🏰", kind: "ancient" },
  { id: "corfu-fortress", name: "Παλαιό Φρούριο Κέρκυρας", country: "Ελλάδα", lat: 39.6244, lng: 19.9296, minZoom: 7.6, importance: 2, icon: "🏰", kind: "ancient" },
  { id: "acropolis-lindos", name: "Ακρόπολη Λίνδου", country: "Ελλάδα", lat: 36.0917, lng: 28.0882, minZoom: 8.0, importance: 2, icon: "🏛️", kind: "temple" }
];

let selectedUser = null;
let currentStream = null;
let facingMode = "environment";
let myExactMarker = null;
let myPublicMarker = null;
let searchMarker = null;
let isAvailable = false;
let myCoordinates = null;
let myAreaName = null;
let searchAbortController = null;
let searchTimer = null;
let deferredInstallPrompt = null;
let selectedArea = null;
let activeMode = "global";
let nearbyRadiusKm = 25;
let visibleUsers = [];
let mapReady = false;

const userMarkerEntries = new Map();
const landmarkEntries = [];

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [23.7, 38.0],
  zoom: 1.35,
  minZoom: 0.5,
  maxZoom: 18,
  maxPitch: 78,
  attributionControl: true,
  renderWorldCopies: false,
  canvasContextAttributes: { antialias: true }
});

const startScreen = document.getElementById("startScreen");
const enterAppBtn = document.getElementById("enterAppBtn");
const availabilityBtn = document.getElementById("availabilityBtn");
const statusLabel = availabilityBtn.querySelector(".status-label");
const installBtn = document.getElementById("installBtn");
const searchWrap = document.getElementById("searchWrap");
const searchToggleBtn = document.getElementById("searchToggleBtn");
const searchForm = document.getElementById("searchForm");
const placeSearch = document.getElementById("placeSearch");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const searchResults = document.getElementById("searchResults");
const globeBtn = document.getElementById("globeBtn");
const areaBtn = document.getElementById("areaBtn");
const locateBtn = document.getElementById("locateBtn");
const focusLocationBtn = document.getElementById("focusLocationBtn");
const cameraBtn = document.getElementById("cameraBtn");
const peopleBtn = document.getElementById("peopleBtn");
const modeTitle = document.getElementById("modeTitle");
const modeDetails = document.getElementById("modeDetails");
const onlineCount = document.getElementById("onlineCount");
const radiusControl = document.getElementById("radiusControl");
const radiusSelect = document.getElementById("radiusSelect");
const locationCard = document.getElementById("locationCard");
const locationTitle = document.getElementById("locationTitle");
const locationDetails = document.getElementById("locationDetails");
const locationSymbol = document.getElementById("locationSymbol");
const peopleDialog = document.getElementById("peopleDialog");
const peopleDialogTitle = document.getElementById("peopleDialogTitle");
const peopleDialogSubtitle = document.getElementById("peopleDialogSubtitle");
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

  try {
    if (!map.getSource("terrainSource")) {
      map.addSource("terrainSource", {
        type: "raster-dem",
        url: "https://tiles.mapterhorn.com/tilejson.json",
        tileSize: 512
      });
    }
    map.setTerrain({ source: "terrainSource", exaggeration: 1.08 });
  } catch (error) {
    console.warn("3D terrain unavailable:", error);
  }

  addOptional3DBuildings();
});

map.on("load", () => {
  mapReady = true;
  createUserMarkers();
  createLandmarkMarkers();
  activateMode("global", { moveMap: false });
  updateLandmarkVisibility();
});

map.on("zoom", updateLandmarkVisibility);
map.on("moveend", updateLandmarkVisibility);

function addOptional3DBuildings() {
  try {
    if (map.getLayer("liveview-3d-buildings")) return;

    const sources = map.getStyle()?.sources || {};
    const sourceId = Object.keys(sources).find(id => {
      const source = sources[id];
      return source && source.type === "vector";
    });

    if (!sourceId) return;

    map.addLayer({
      id: "liveview-3d-buildings",
      type: "fill-extrusion",
      source: sourceId,
      "source-layer": "building",
      minzoom: 14,
      paint: {
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["get", "render_height"],
          0, "#d9e2ed",
          80, "#9fb4ca",
          250, "#6e8fae"
        ],
        "fill-extrusion-height": [
          "coalesce",
          ["get", "render_height"],
          ["get", "height"],
          8
        ],
        "fill-extrusion-base": [
          "coalesce",
          ["get", "render_min_height"],
          ["get", "min_height"],
          0
        ],
        "fill-extrusion-opacity": 0.72
      }
    });
  } catch (error) {
    console.warn("3D buildings unavailable:", error);
  }
}

enterAppBtn.addEventListener("click", async () => {
  enterAppBtn.disabled = true;
  startScreen.classList.add("leaving");

  window.setTimeout(() => {
    startScreen.hidden = true;
  }, 500);

  await requestMyLocation({ keepGlobeView: true, silentFailure: false });
});

function createUserMarkers() {
  demoUsers.forEach(user => {
    const el = document.createElement("button");
    el.className = "user-marker";
    el.type = "button";
    el.textContent = user.name.charAt(0);
    el.title = `${user.name} — ${user.area}`;
    el.addEventListener("click", () => openRequest(user));

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([user.lng, user.lat])
      .addTo(map);

    userMarkerEntries.set(user.id, { user, marker, element: el });
  });
}

function createLandmarkMarkers() {
  landmarks.forEach(landmark => {
    const el = document.createElement("button");
    el.type = "button";
    el.className = [
      "landmark-marker",
      landmark.kind || "modern",
      landmark.importance > 1 ? "secondary" : ""
    ].filter(Boolean).join(" ");
    el.setAttribute("aria-label", `${landmark.name}, ${landmark.country}`);
    el.innerHTML = `
      <span class="landmark-model">
        <span class="landmark-icon">${landmark.icon}</span>
      </span>
      <span class="landmark-label">${escapeHtml(landmark.name)}</span>
    `;

    const popup = new maplibregl.Popup({
      className: "landmark-popup",
      closeButton: false,
      offset: 34
    }).setHTML(`<strong>${escapeHtml(landmark.name)}</strong><small>${escapeHtml(landmark.country)}</small>`);

    const marker = new maplibregl.Marker({
      element: el,
      anchor: "bottom"
    })
      .setLngLat([landmark.lng, landmark.lat])
      .setPopup(popup)
      .addTo(map);

    landmarkEntries.push({ landmark, marker, element: el });
  });
}

function updateLandmarkVisibility() {
  if (!mapReady) return;

  const zoom = map.getZoom();
  const scale = Math.min(1.18, Math.max(0.62, 0.64 + zoom * 0.055));

  landmarkEntries.forEach(entry => {
    const { landmark, element } = entry;
    const visible = zoom >= landmark.minZoom;

    element.classList.toggle("hidden-landmark", !visible);
    element.style.setProperty("--landmark-scale", scale.toFixed(2));

    const label = element.querySelector(".landmark-label");
    if (label) {
      const showLabel = landmark.importance === 1 || zoom >= landmark.minZoom + 0.8;
      label.hidden = !showLabel;
    }
  });
}

function openRequest(user) {
  if (peopleDialog.open) peopleDialog.close();

  selectedUser = user;
  requestName.textContent = `Αίτημα προς ${user.name}`;
  requestLocation.textContent = `${user.area}, ${user.country}`;
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

function createExactLocationMarker(longitude, latitude) {
  if (myExactMarker) myExactMarker.remove();

  const el = document.createElement("div");
  el.className = "user-marker me";
  el.title = "Η ακριβής θέση σου — ορατή μόνο σε εσένα";

  myExactMarker = new maplibregl.Marker({ element: el })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

async function reverseGeocode(latitude, longitude) {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("lat", String(latitude));
  url.searchParams.set("lon", String(longitude));
  url.searchParams.set("zoom", "12");
  url.searchParams.set("accept-language", "el,en");

  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const address = result.address || {};

    return (
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      address.state ||
      "Η θέση μου"
    );
  } catch (error) {
    return "Η θέση μου";
  }
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
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy || 0);

        myCoordinates = { latitude, longitude, accuracy };
        createExactLocationMarker(longitude, latitude);

        myAreaName = await reverseGeocode(latitude, longitude);

        updateLocationCard({
          title: myAreaName,
          details: accuracy
            ? `Η θέση εντοπίστηκε • ακρίβεια περίπου ±${accuracy} m`
            : "Η θέση εντοπίστηκε.",
          ready: true
        });

        map.easeTo({
          center: [longitude, latitude],
          zoom: keepGlobeView ? 1.8 : 13,
          duration: 1800
        });

        if (activeMode === "nearby") refreshUsers();
        resolve(true);
      },
      error => {
        if (!silentFailure) {
          const denied = error.code === error.PERMISSION_DENIED;
          updateLocationCard({
            title: denied ? "Δεν δόθηκε άδεια τοποθεσίας" : "Αδυναμία εντοπισμού",
            details: denied
              ? "Επίτρεψε την τοποθεσία από τις ρυθμίσεις της εφαρμογής."
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
    zoom: 13,
    pitch: 50,
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
    el.className = "user-marker public-me";
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

function haversineKm(lat1, lng1, lat2, lng2) {
  const toRadians = value => value * Math.PI / 180;
  const earthRadiusKm = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function isInsideBounds(user, bounds) {
  if (!bounds) return false;

  const [south, north, west, east] = bounds;
  const latitudeInside = user.lat >= south && user.lat <= north;

  if (west <= east) {
    return latitudeInside && user.lng >= west && user.lng <= east;
  }

  return latitudeInside && (user.lng >= west || user.lng <= east);
}

function getUsersForCurrentMode() {
  const available = demoUsers.filter(user => user.status === "available");

  if (activeMode === "global") return available;

  if (activeMode === "area") {
    if (!selectedArea) return [];
    return available.filter(user => isInsideBounds(user, selectedArea.bounds));
  }

  if (activeMode === "nearby") {
    if (!myCoordinates) return [];

    return available.filter(user =>
      haversineKm(
        myCoordinates.latitude,
        myCoordinates.longitude,
        user.lat,
        user.lng
      ) <= nearbyRadiusKm
    );
  }

  return available;
}

function refreshUsers() {
  visibleUsers = getUsersForCurrentMode();
  const visibleIds = new Set(visibleUsers.map(user => user.id));

  userMarkerEntries.forEach(({ user, element }) => {
    element.classList.toggle("hidden-marker", !visibleIds.has(user.id));
  });

  onlineCount.textContent = String(visibleUsers.length);

  if (activeMode === "global") {
    modeTitle.textContent = "Υδρόγειος";
    modeDetails.textContent = "Όλοι οι διαθέσιμοι χρήστες";
    peopleDialogSubtitle.textContent = "Διαθέσιμοι χρήστες από όλο τον κόσμο.";
  } else if (activeMode === "area") {
    const areaName = selectedArea?.name || "Επιλεγμένη περιοχή";
    modeTitle.textContent = "Περιοχή";
    modeDetails.textContent = areaName;
    peopleDialogSubtitle.textContent = `Διαθέσιμοι χρήστες στην περιοχή: ${areaName}.`;
  } else {
    modeTitle.textContent = "Κοντά μου";
    modeDetails.textContent = `Σε ακτίνα ${nearbyRadiusKm} km`;
    peopleDialogSubtitle.textContent = `Διαθέσιμοι χρήστες σε ακτίνα ${nearbyRadiusKm} km από τη θέση σου.`;
  }

  renderUsersList();
}

function renderUsersList() {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  if (visibleUsers.length === 0) {
    list.innerHTML = `<div class="user-list-empty">Δεν υπάρχουν δοκιμαστικοί διαθέσιμοι χρήστες σε αυτή την επιλογή.</div>`;
    return;
  }

  visibleUsers.forEach(user => {
    const distance = myCoordinates
      ? haversineKm(myCoordinates.latitude, myCoordinates.longitude, user.lat, user.lng)
      : null;

    const card = document.createElement("article");
    card.className = "user-card";
    card.innerHTML = `
      <div class="avatar">${escapeHtml(user.name.charAt(0))}</div>
      <div class="user-main">
        <strong>${escapeHtml(user.name)}</strong>
        <small>${escapeHtml(user.area)}, ${escapeHtml(user.country)}${distance !== null ? ` • ${distance.toFixed(distance < 10 ? 1 : 0)} km` : ""}</small>
      </div>
      <button class="request-btn" type="button">Αίτημα</button>
    `;
    card.querySelector(".request-btn").addEventListener("click", () => openRequest(user));
    list.appendChild(card);
  });
}

function updateModeButtons() {
  globeBtn.classList.toggle("active", activeMode === "global");
  areaBtn.classList.toggle("active", activeMode === "area");
  locateBtn.classList.toggle("active", activeMode === "nearby");
  radiusControl.hidden = activeMode !== "nearby";
}

async function activateMode(mode, { moveMap = true } = {}) {
  if (mode === "area" && !selectedArea) {
    openSearch();
    showToast("Αναζήτησε και επίλεξε πρώτα μια περιοχή.");
    return;
  }

  if (mode === "nearby" && !myCoordinates) {
    const located = await requestMyLocation({ keepGlobeView: false });
    if (!located) return;
  }

  activeMode = mode;
  updateModeButtons();
  refreshUsers();

  if (!moveMap) return;

  if (mode === "global") {
    map.flyTo({
      center: myCoordinates
        ? [myCoordinates.longitude, myCoordinates.latitude]
        : [23.7, 38.0],
      zoom: 1.35,
      pitch: 0,
      bearing: 0,
      duration: 1800
    });
  } else if (mode === "area" && selectedArea) {
    flyToSelectedArea(selectedArea);
  } else if (mode === "nearby") {
    focusOnMyLocation();
  }
}

globeBtn.addEventListener("click", () => activateMode("global"));
areaBtn.addEventListener("click", () => activateMode("area"));
locateBtn.addEventListener("click", () => activateMode("nearby"));
focusLocationBtn.addEventListener("click", focusOnMyLocation);

radiusSelect.addEventListener("change", () => {
  nearbyRadiusKm = Number(radiusSelect.value);
  if (activeMode === "nearby") refreshUsers();
});

function openSearch() {
  searchWrap.classList.add("open");
  searchToggleBtn.classList.add("active");
  window.setTimeout(() => placeSearch.focus(), 100);
}

function closeSearch() {
  searchWrap.classList.remove("open");
  searchToggleBtn.classList.remove("active");
  searchResults.hidden = true;
}

searchToggleBtn.addEventListener("click", () => {
  if (searchWrap.classList.contains("open")) {
    closeSearch();
  } else {
    openSearch();
  }
});

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
  url.searchParams.set("limit", "7");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "el,en");
  url.searchParams.set("q", cleanQuery);

  try {
    const response = await fetch(url, {
      signal: searchAbortController.signal,
      headers: { Accept: "application/json" }
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
    const rawBounds = Array.isArray(result.boundingbox) ? result.boundingbox.map(Number) : null;

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
      selectSearchResult({
        latitude,
        longitude,
        label,
        primary,
        bounds: rawBounds
      });
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

function normalizeAreaBounds(latitude, longitude, bounds) {
  if (bounds && bounds.length === 4 && bounds.every(Number.isFinite)) {
    const [south, north, west, east] = bounds;
    const latSpan = Math.abs(north - south);
    const lngSpan = Math.abs(east - west);

    if (latSpan >= 0.04 || lngSpan >= 0.04) {
      return [south, north, west, east];
    }
  }

  const latDelta = 0.65;
  const lngDelta = 0.85;
  return [
    latitude - latDelta,
    latitude + latDelta,
    longitude - lngDelta,
    longitude + lngDelta
  ];
}

function selectSearchResult({ latitude, longitude, label, primary, bounds }) {
  placeSearch.value = primary;
  clearSearchBtn.hidden = false;

  selectedArea = {
    name: primary,
    label,
    latitude,
    longitude,
    bounds: normalizeAreaBounds(latitude, longitude, bounds)
  };

  if (searchMarker) searchMarker.remove();

  const el = document.createElement("div");
  el.className = "search-marker";
  el.textContent = "⌖";
  el.title = label;

  searchMarker = new maplibregl.Marker({ element: el })
    .setLngLat([longitude, latitude])
    .addTo(map);

  closeSearch();
  activeMode = "area";
  updateModeButtons();
  refreshUsers();
  flyToSelectedArea(selectedArea);
}

function flyToSelectedArea(area) {
  if (area.bounds) {
    const [south, north, west, east] = area.bounds;
    map.fitBounds(
      [[west, south], [east, north]],
      {
        padding: { top: 150, right: 80, bottom: 160, left: 80 },
        maxZoom: 11,
        pitch: 38,
        duration: 1800
      }
    );
    return;
  }

  map.flyTo({
    center: [area.longitude, area.latitude],
    zoom: 9,
    pitch: 38,
    duration: 1800
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

peopleBtn.addEventListener("click", () => {
  peopleDialogTitle.textContent = `${visibleUsers.length} διαθέσιμοι χρήστες`;
  renderUsersList();
  peopleDialog.showModal();
});

closePeopleBtn.addEventListener("click", () => peopleDialog.close());

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
