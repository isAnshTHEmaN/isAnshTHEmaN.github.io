// map.js

let mapInitialized = false;
let busMarker;
let routeCoordinates = [
  [40.592003, -74.626640],
  [40.591700, -74.627200],
  [40.591400, -74.627800],
  [40.591000, -74.628200],
  [40.590819, -74.629155],
  [40.590500, -74.629500],
  [40.590000, -74.629900],
  [40.589500, -74.630300],
  [40.589075, -74.630882],
  [40.588800, -74.631100],
  [40.588400, -74.631400],
  [40.588000, -74.631700],
  [40.587700, -74.632000],
  [40.587400, -74.632200],
  [40.587142, -74.632470],
  [40.586800, -74.632500],
  [40.586400, -74.632600],
  [40.586000, -74.632650],
  [40.585700, -74.632700],
  [40.585417, -74.632778],
  [40.585100, -74.632800],
  [40.584800, -74.632820],
  [40.584500, -74.632850],
  [40.584200, -74.632870],
  [40.583900, -74.632880],
  [40.583742, -74.632900],
  [40.583500, -74.632850],
  [40.583200, -74.632800],
  [40.582900, -74.632700],
  [40.582600, -74.632600],
  [40.582300, -74.632500],
  [40.582000, -74.632400],
  [40.581700, -74.632300],
  [40.581400, -74.632200],
  [40.581100, -74.632100],
  [40.580800, -74.632000],
  [40.580500, -74.631900],
  [40.580200, -74.631800],
  [40.579900, -74.631700],
  [40.579600, -74.631600],
  [40.579300, -74.631500],
  [40.579000, -74.631400],
  [40.578700, -74.631300],
  [40.578400, -74.631200],
  [40.578100, -74.631100],
];
let currentIndex = 0;
let map;
let intervalId;

function moveBus() {
  currentIndex = (currentIndex + 1) % routeCoordinates.length;
  busMarker.setLatLng(routeCoordinates[currentIndex]);
  map.panTo(routeCoordinates[currentIndex]);
}

/**
 * showDashboard-style toggle for each child-card.
 * startLat/startLng default to Tharun’s home if not passed.
 */
function toggleMap(mapId, driverId, startLat = 40.585417, startLng = -74.632778) {
  const mapContainer = document.getElementById(mapId);
  const driverCard   = document.getElementById(driverId);

  if (mapContainer.style.display === "none") {
    mapContainer.style.display = "block";
    driverCard.style.display   = "block";

    // initialize fresh map
    map = L.map(mapId).setView([startLat, startLng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const busIcon = L.icon({
      iconUrl: 'bus-marker.png',
      iconSize: [32, 37],
      iconAnchor: [16, 37],
    });

    // put marker at your start coords
    busMarker = L.marker([startLat, startLng], { icon: busIcon }).addTo(map);

    // draw the same route
    L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);

    // animate it
    intervalId = setInterval(moveBus, 1500);

    // show driver info; if you want Thulasi’s name here, you could detect driverId==='driver2'
    const name = driverId === 'driver2' ? 'Thulasi N.' : 'Tharun N.';
    driverCard.innerHTML = `
      <div class="driver-card card mt-3">
        <div class="card-body d-flex align-items-center">
          <img src="default-profile.jpg" class="driver-profile-pic me-3">
          <div>
            <div class="driver-name">${name}</div>
            <div class="text-muted">Last updated: Just now</div>
          </div>
        </div>
      </div>`;
  } else {
    // hide and clean up
    mapContainer.style.display = "none";
    driverCard.style.display   = "none";
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
}
