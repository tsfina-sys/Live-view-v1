const fallbackDemoUsers = [
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

let appUsers = [...fallbackDemoUsers];


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
let supabaseClient = null;
let currentUser = null;
let currentProfile = null;
let profilesChannel = null;
let supabaseConfigured = false;
let myCountryName = null;
let appEntered = false;
let pendingEntryAfterAuth = false;
let guestMode = false;

const userMarkerEntries = new Map();

const map = new maplibregl.Map({
  container: "map",
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [23.7, 38.0],
  zoom: 1.35,
  minZoom: 0.5,
  maxZoom: 18,
  maxPitch: 78,
  attributionControl: false,
  renderWorldCopies: false,
  canvasContextAttributes: { antialias: true }
});

map.addControl(
  new maplibregl.AttributionControl({ compact: true }),
  "bottom-right"
);

const startScreen = document.getElementById("startScreen");
const startIntro = document.getElementById("startIntro");
const startAuthPanel = document.getElementById("startAuthPanel");
const enterAppBtn = document.getElementById("enterAppBtn");
const backAuthBtn = document.getElementById("backAuthBtn");
const profileMenuBtn = document.getElementById("profileMenuBtn");
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
const cameraBtn = document.getElementById("cameraBtn");
const peopleBtn = document.getElementById("peopleBtn");
const modeTitle = document.getElementById("modeTitle");
const modeDetails = document.getElementById("modeDetails");
const onlineCount = document.getElementById("onlineCount");
const radiusControl = document.getElementById("radiusControl");
const radiusSelect = document.getElementById("radiusSelect");
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
const supabaseMissingNotice = document.getElementById("supabaseMissingNotice");
const showLoginBtn = document.getElementById("showLoginBtn");
const showRegisterBtn = document.getElementById("showRegisterBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const registerNickname = document.getElementById("registerNickname");
const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const registerPasswordAgain = document.getElementById("registerPasswordAgain");
const acceptTerms = document.getElementById("acceptTerms");
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const authMessage = document.getElementById("authMessage");
const guestEntryWrap = document.getElementById("guestEntryWrap");
const guestEntryBtn = document.getElementById("guestEntryBtn");

const accountDialog = document.getElementById("accountDialog");
const closeAccountBtn = document.getElementById("closeAccountBtn");
const accountEmail = document.getElementById("accountEmail");
const accountInitialLarge = document.getElementById("accountInitialLarge");
const accountNickname = document.getElementById("accountNickname");
const accountState = document.getElementById("accountState");
const profileForm = document.getElementById("profileForm");
const profileNicknameInput = document.getElementById("profileNicknameInput");
const accountAvailabilityText = document.getElementById("accountAvailabilityText");
const accountAvailabilityBtn = document.getElementById("accountAvailabilityBtn");
const logoutBtn = document.getElementById("logoutBtn");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3200);
}


function setAuthMessage(message = "", type = "") {
  authMessage.textContent = message;
  authMessage.classList.toggle("error", type === "error");
  authMessage.classList.toggle("success", type === "success");
}

function getSupabaseConfig() {
  const config = window.LIVEVIEW_SUPABASE || {};
  return {
    url: String(config.url || "").trim(),
    key: String(config.publishableKey || config.anonKey || "").trim()
  };
}

function initializeSupabaseClient() {
  const config = getSupabaseConfig();
  const placeholder =
    !config.url ||
    !config.key ||
    config.url.includes("PASTE_") ||
    config.key.includes("PASTE_");

  supabaseConfigured =
    !placeholder &&
    Boolean(window.supabase?.createClient);

  supabaseMissingNotice.hidden = supabaseConfigured;

  if (!supabaseConfigured) {
    guestEntryWrap.hidden = false;
    setAppUsers(fallbackDemoUsers);
    updateAccountUi();
    return false;
  }

  guestEntryWrap.hidden = true;

  supabaseClient = window.supabase.createClient(config.url, config.key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  return true;
}

function openAuthDialog(mode = "login") {
  switchAuthMode(mode);
  setAuthMessage("");
  supabaseMissingNotice.hidden = supabaseConfigured;
  guestEntryWrap.hidden = supabaseConfigured;
  startIntro.hidden = true;
  startAuthPanel.hidden = false;

  window.setTimeout(() => {
    const firstField = mode === "login" ? loginEmail : registerNickname;
    firstField?.focus();
  }, 100);
}

function closeAuthPanel() {
  pendingEntryAfterAuth = false;
  startAuthPanel.hidden = true;
  startIntro.hidden = false;
  enterAppBtn.disabled = false;
  setAuthMessage("");
}

function updateStartEntryButton() {
  if (currentUser) {
    enterAppBtn.textContent = "Είσοδος";
    return;
  }

  enterAppBtn.textContent = supabaseConfigured
    ? "Σύνδεση / Εγγραφή"
    : "Είσοδος / Ρύθμιση λογαριασμού";
}

async function enterMainApp() {
  if (appEntered) return;

  appEntered = true;
  pendingEntryAfterAuth = false;
  startAuthPanel.hidden = true;
  startIntro.hidden = false;
  startScreen.classList.add("leaving");

  window.setTimeout(() => {
    startScreen.hidden = true;
  }, 500);

  await requestMyLocation({ keepGlobeView: true, silentFailure: false });
}

function showStartScreen() {
  appEntered = false;
  pendingEntryAfterAuth = false;
  startScreen.hidden = false;
  startAuthPanel.hidden = true;
  startIntro.hidden = false;
  enterAppBtn.disabled = false;

  requestAnimationFrame(() => {
    startScreen.classList.remove("leaving");
  });

  updateStartEntryButton();
}

function switchAuthMode(mode) {
  const login = mode === "login";
  loginForm.hidden = !login;
  registerForm.hidden = login;
  showLoginBtn.classList.toggle("active", login);
  showRegisterBtn.classList.toggle("active", !login);
}

function updateAvailabilityUi() {
  availabilityBtn.classList.toggle("active", isAvailable);
  availabilityBtn.setAttribute("aria-pressed", String(isAvailable));
  statusLabel.textContent = isAvailable ? "Διαθέσιμος" : "Μη διαθέσιμος";
  accountAvailabilityText.textContent = isAvailable ? "Διαθέσιμος" : "Μη διαθέσιμος";
  accountAvailabilityBtn.textContent = isAvailable ? "Απενεργοποίηση" : "Ενεργοποίηση";
  accountAvailabilityBtn.classList.toggle("active", isAvailable);
}

function updateAccountUi() {
  const nickname =
    currentProfile?.nickname ||
    currentUser?.user_metadata?.nickname ||
    currentUser?.email?.split("@")[0] ||
    "Χρήστης";

  const initial = currentUser ? nickname.charAt(0).toUpperCase() : "?";

  accountInitialLarge.textContent = initial;
  accountNickname.textContent = nickname;
  accountEmail.textContent = currentUser?.email || "Δεν έχει γίνει σύνδεση";
  profileNicknameInput.value = currentUser ? nickname : "";
  accountState.textContent = currentUser ? "Συνδεδεμένος" : (guestMode ? "Δοκιμαστική είσοδος" : "Επισκέπτης");
  profileMenuBtn.title = currentUser ? `Προφίλ: ${nickname}` : "Λογαριασμός";

  updateStartEntryButton();
  updateAvailabilityUi();
}

async function ensureProfile() {
  if (!supabaseClient || !currentUser) return null;

  const nickname =
    currentUser.user_metadata?.nickname ||
    currentUser.email?.split("@")[0] ||
    "Χρήστης";

  const { data, error } = await supabaseClient
    .from("profiles")
    .upsert(
      {
        id: currentUser.id,
        nickname
      },
      { onConflict: "id" }
    )
    .select()
    .single();

  if (error) {
    console.warn("Profile upsert failed:", error);
    return null;
  }

  return data;
}

async function loadMyProfile() {
  if (!supabaseClient || !currentUser) return null;

  let { data, error } = await supabaseClient
    .from("profiles")
    .select("id,nickname,is_available,public_lat,public_lng,area_name,country_name,last_seen")
    .eq("id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.warn("Profile load failed:", error);
  }

  if (!data) {
    data = await ensureProfile();
  }

  currentProfile = data || null;
  isAvailable = Boolean(currentProfile?.is_available);

  if (myPublicMarker) {
    myPublicMarker.remove();
    myPublicMarker = null;
  }

  if (
    isAvailable &&
    Number.isFinite(Number(currentProfile?.public_lat)) &&
    Number.isFinite(Number(currentProfile?.public_lng))
  ) {
    createOwnPublicMarker(
      Number(currentProfile.public_lng),
      Number(currentProfile.public_lat)
    );
  }

  updateAccountUi();
  return currentProfile;
}

function createOwnPublicMarker(longitude, latitude) {
  if (myPublicMarker) myPublicMarker.remove();

  const el = document.createElement("div");
  el.className = "user-marker public-me";
  const publicNickname =
    currentProfile?.nickname ||
    currentUser?.user_metadata?.nickname ||
    (guestMode ? "Guest" : "Ε");
  el.textContent = publicNickname.charAt(0).toUpperCase();
  el.title = "Η προσεγγιστική δημόσια θέση σου";

  myPublicMarker = new maplibregl.Marker({ element: el })
    .setLngLat([longitude, latitude])
    .addTo(map);
}

async function loadRealUsers() {
  if (!supabaseClient || !currentUser) {
    setAppUsers(supabaseConfigured ? [] : fallbackDemoUsers);
    return;
  }

  let query = supabaseClient
    .from("profiles")
    .select("id,nickname,public_lat,public_lng,area_name,country_name,is_available,last_seen")
    .eq("is_available", true)
    .not("public_lat", "is", null)
    .not("public_lng", "is", null);

  query = query.neq("id", currentUser.id);

  const { data, error } = await query;

  if (error) {
    console.warn("Available users load failed:", error);
    showToast("Δεν φορτώθηκαν οι διαθέσιμοι χρήστες.");
    return;
  }

  const users = (data || []).map(profile => ({
    id: profile.id,
    name: profile.nickname || "Χρήστης",
    area: profile.area_name || "Άγνωστη περιοχή",
    country: profile.country_name || "",
    lat: Number(profile.public_lat),
    lng: Number(profile.public_lng),
    status: "available",
    real: true
  })).filter(user => Number.isFinite(user.lat) && Number.isFinite(user.lng));

  setAppUsers(users);
}

function unsubscribeProfiles() {
  if (supabaseClient && profilesChannel) {
    supabaseClient.removeChannel(profilesChannel);
  }
  profilesChannel = null;
}

function subscribeProfiles() {
  if (!supabaseClient || !currentUser) return;

  unsubscribeProfiles();

  profilesChannel = supabaseClient
    .channel("liveview-profiles")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "profiles" },
      () => loadRealUsers()
    )
    .subscribe();
}

async function applySession(session) {
  currentUser = session?.user || null;
  if (currentUser) guestMode = false;

  if (!currentUser) {
    currentProfile = null;
    isAvailable = false;
    unsubscribeProfiles();

    if (myPublicMarker) {
      myPublicMarker.remove();
      myPublicMarker = null;
    }

    setAppUsers(supabaseConfigured ? [] : fallbackDemoUsers);
    updateAccountUi();

    if (appEntered) {
      showStartScreen();
    }
    return;
  }

  await loadMyProfile();
  await loadRealUsers();
  subscribeProfiles();

  if (pendingEntryAfterAuth && !appEntered) {
    await enterMainApp();
  }
}

async function initializeAuth() {
  if (!initializeSupabaseClient()) return;

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) console.warn("Session load failed:", error);

  await applySession(data?.session || null);

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    window.setTimeout(() => applySession(session), 0);
  });
}

async function toggleAvailability() {
  if (guestMode && !supabaseConfigured) {
    if (!isAvailable) {
      const located =
        Boolean(myCoordinates) ||
        await requestMyLocation({ keepGlobeView: false });

      if (!located || !myCoordinates) return;

      const publicLongitude = privacyOffset(myCoordinates.longitude);
      const publicLatitude = privacyOffset(myCoordinates.latitude);

      isAvailable = true;
      createOwnPublicMarker(publicLongitude, publicLatitude);
      updateAccountUi();
      showToast("Διαθεσιμότητα δοκιμής ενεργή.");
      return;
    }

    isAvailable = false;
    if (myPublicMarker) {
      myPublicMarker.remove();
      myPublicMarker = null;
    }
    updateAccountUi();
    showToast("Η διαθεσιμότητα δοκιμής απενεργοποιήθηκε.");
    return;
  }

  if (!supabaseConfigured) {
    showStartScreen();
    pendingEntryAfterAuth = true;
    openAuthDialog("login");
    setAuthMessage(
      "Για πραγματικό λογαριασμό χρειάζεται πρώτα ρύθμιση Supabase.",
      "error"
    );
    return;
  }

  if (!currentUser) {
    openAuthDialog("login");
    setAuthMessage("Συνδέσου για να εμφανιστείς ως διαθέσιμος.");
    return;
  }

  if (!isAvailable) {
    const located =
      Boolean(myCoordinates) ||
      await requestMyLocation({ keepGlobeView: false });

    if (!located || !myCoordinates) return;

    const publicLongitude = privacyOffset(myCoordinates.longitude);
    const publicLatitude = privacyOffset(myCoordinates.latitude);

    const { data, error } = await supabaseClient
      .from("profiles")
      .update({
        is_available: true,
        public_lat: publicLatitude,
        public_lng: publicLongitude,
        area_name: myAreaName || "Η περιοχή μου",
        country_name: myCountryName || "",
        last_seen: new Date().toISOString()
      })
      .eq("id", currentUser.id)
      .select()
      .single();

    if (error) {
      console.error(error);
      showToast("Δεν ενεργοποιήθηκε η διαθεσιμότητα.");
      return;
    }

    currentProfile = data;
    isAvailable = true;
    createOwnPublicMarker(publicLongitude, publicLatitude);
    updateAccountUi();
    await loadRealUsers();
    showToast("Εμφανίζεσαι με προσεγγιστική θέση.");
    return;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .update({
      is_available: false,
      public_lat: null,
      public_lng: null,
      last_seen: new Date().toISOString()
    })
    .eq("id", currentUser.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    showToast("Δεν απενεργοποιήθηκε η διαθεσιμότητα.");
    return;
  }

  currentProfile = data;
  isAvailable = false;

  if (myPublicMarker) {
    myPublicMarker.remove();
    myPublicMarker = null;
  }

  updateAccountUi();
  await loadRealUsers();
  showToast("Δεν εμφανίζεσαι πλέον ως διαθέσιμος.");
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
  rebuildUserMarkers();
  activateMode("global", { moveMap: false });
});


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

  if (currentUser) {
    await enterMainApp();
    enterAppBtn.disabled = false;
    return;
  }

  pendingEntryAfterAuth = true;
  openAuthDialog("login");
  enterAppBtn.disabled = false;
});

function clearUserMarkers() {
  userMarkerEntries.forEach(({ marker }) => marker.remove());
  userMarkerEntries.clear();
}

function createUserMarkers() {
  appUsers.forEach(user => {
    const el = document.createElement("button");
    el.className = "user-marker";
    el.type = "button";
    el.textContent = user.name.charAt(0).toUpperCase();
    el.title = `${user.name} — ${user.area || "Άγνωστη περιοχή"}`;
    el.addEventListener("click", () => openRequest(user));

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat([user.lng, user.lat])
      .addTo(map);

    userMarkerEntries.set(user.id, { user, marker, element: el });
  });
}

function rebuildUserMarkers() {
  if (!mapReady) return;
  clearUserMarkers();
  createUserMarkers();
  refreshUsers();
}

function setAppUsers(users) {
  appUsers = Array.isArray(users) ? users : [];
  rebuildUserMarkers();
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
  // Η κατάσταση GPS διατηρείται εσωτερικά χωρίς να εμφανίζεται πλαίσιο στον χάρτη.
  window.liveViewLocationStatus = { title, details, ready, error };
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

    return {
      area:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        address.state ||
        "Η θέση μου",
      country: address.country || ""
    };
  } catch (error) {
    return { area: "Η θέση μου", country: "" };
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

        const placeDetails = await reverseGeocode(latitude, longitude);
        myAreaName = placeDetails.area;
        myCountryName = placeDetails.country;

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

availabilityBtn.addEventListener("click", toggleAvailability);

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
  const available = appUsers.filter(user => user.status === "available");

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
    list.innerHTML = `<div class="user-list-empty">Δεν υπάρχουν διαθέσιμοι χρήστες σε αυτή την επιλογή.</div>`;
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

  if (supabaseConfigured && !currentUser) {
    requestDialog.close();
    showStartScreen();
    pendingEntryAfterAuth = true;
    openAuthDialog("login");
    setAuthMessage("Συνδέσου για να στείλεις αίτημα.");
    return;
  }

  requestDialog.close();
  showToast(`Το αίτημα προς ${selectedUser.name} θα ενεργοποιηθεί στο επόμενο βήμα.`);
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


profileMenuBtn.addEventListener("click", () => {
  if (currentUser) {
    updateAccountUi();
    if (typeof accountDialog.showModal === "function") {
      accountDialog.showModal();
    } else {
      accountDialog.setAttribute("open", "");
    }
    return;
  }

  if (guestMode) {
    showToast("Βρίσκεσαι σε λειτουργία δοκιμής.");
    return;
  }

  showStartScreen();
  pendingEntryAfterAuth = true;
  openAuthDialog("login");
});

backAuthBtn.addEventListener("click", closeAuthPanel);
closeAccountBtn.addEventListener("click", () => accountDialog.close());

showLoginBtn.addEventListener("click", () => {
  switchAuthMode("login");
  setAuthMessage("");
});

showRegisterBtn.addEventListener("click", () => {
  switchAuthMode("register");
  setAuthMessage("");
});

guestEntryBtn.addEventListener("click", async () => {
  guestMode = true;
  pendingEntryAfterAuth = false;
  setAppUsers(fallbackDemoUsers);
  updateAccountUi();
  await enterMainApp();
  showToast("Μπήκες σε λειτουργία δοκιμής.");
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!supabaseClient) {
    setAuthMessage("Δεν έχει ρυθμιστεί το Supabase.", "error");
    return;
  }

  setAuthMessage("Γίνεται σύνδεση…");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: loginEmail.value.trim(),
    password: loginPassword.value
  });

  if (error) {
    setAuthMessage(error.message || "Αποτυχία σύνδεσης.", "error");
    return;
  }

  setAuthMessage("Η σύνδεση ολοκληρώθηκε.", "success");
  loginForm.reset();

  if (data?.session) {
    await applySession(data.session);
    await enterMainApp();
  }
});

registerForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!supabaseClient) {
    setAuthMessage("Δεν έχει ρυθμιστεί το Supabase.", "error");
    return;
  }

  const nickname = registerNickname.value.trim();
  const email = registerEmail.value.trim();
  const password = registerPassword.value;
  const passwordAgain = registerPasswordAgain.value;

  if (password !== passwordAgain) {
    setAuthMessage("Οι δύο κωδικοί δεν είναι ίδιοι.", "error");
    return;
  }

  if (!acceptTerms.checked) {
    setAuthMessage("Χρειάζεται αποδοχή της δήλωσης ιδιωτικότητας.", "error");
    return;
  }

  setAuthMessage("Δημιουργείται ο λογαριασμός…");

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { nickname },
      emailRedirectTo: `${window.location.origin}${window.location.pathname}`
    }
  });

  if (error) {
    setAuthMessage(error.message || "Αποτυχία εγγραφής.", "error");
    return;
  }

  registerForm.reset();

  if (data?.session) {
    setAuthMessage("Ο λογαριασμός δημιουργήθηκε.", "success");
    await applySession(data.session);
    await enterMainApp();
  } else {
    setAuthMessage(
      "Ο λογαριασμός δημιουργήθηκε. Έλεγξε το email σου για επιβεβαίωση.",
      "success"
    );
  }
});

forgotPasswordBtn.addEventListener("click", async () => {
  if (!supabaseClient) {
    setAuthMessage("Δεν έχει ρυθμιστεί το Supabase.", "error");
    return;
  }

  const email = loginEmail.value.trim();
  if (!email) {
    setAuthMessage("Γράψε πρώτα το email σου.", "error");
    return;
  }

  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}${window.location.pathname}`
  });

  if (error) {
    setAuthMessage(error.message || "Δεν στάλθηκε email επαναφοράς.", "error");
    return;
  }

  setAuthMessage("Στάλθηκε email επαναφοράς κωδικού.", "success");
});

profileForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!supabaseClient || !currentUser) return;

  const nickname = profileNicknameInput.value.trim();
  if (nickname.length < 2) {
    showToast("Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες.");
    return;
  }

  const { data, error } = await supabaseClient
    .from("profiles")
    .update({ nickname })
    .eq("id", currentUser.id)
    .select()
    .single();

  if (error) {
    console.error(error);
    showToast("Δεν αποθηκεύτηκε το όνομα.");
    return;
  }

  currentProfile = data;
  updateAccountUi();
  await loadRealUsers();
  showToast("Το όνομα αποθηκεύτηκε.");
});

accountAvailabilityBtn.addEventListener("click", toggleAvailability);

logoutBtn.addEventListener("click", async () => {
  if (!supabaseClient) return;

  if (isAvailable) {
    const { error: availabilityError } = await supabaseClient
      .from("profiles")
      .update({
        is_available: false,
        public_lat: null,
        public_lng: null,
        last_seen: new Date().toISOString()
      })
      .eq("id", currentUser.id);

    if (availabilityError) {
      console.warn("Availability cleanup failed:", availabilityError);
    }
  }

  await supabaseClient.auth.signOut();
  if (accountDialog.open) accountDialog.close();
  showStartScreen();
  showToast("Έγινε αποσύνδεση.");
});

updateStartEntryButton();
initializeAuth();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Η εφαρμογή συνεχίζει να λειτουργεί χωρίς offline cache.
    });
  });
}
