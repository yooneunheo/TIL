var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.52857385480169, lng: 127.0331840846545 },
    zoom: 9,
    streetViewControl: false,
  });

  let markers = stores.properties;

  for (var x = 0; x < markers.length; x++) {
    let storeInfo = markers[x].info;
    let longitude = markers[x].coordinates.longitude;
    let latitude = markers[x].coordinates.latitude;

    dropMarker(latitude, longitude, storeInfo);
  }
}

function dropMarker(lat, lng, info) {
  var info = { info: info };
  var location = { lat: lat, lng: lng };
  var contentString = `
  <h4>${info.name}<h4>
  <p>Address : ${info.address}</p>
  <p>${info.schedule.dayName} ${info.schedule.hours}</p>
  <p>${info.storeNumber}</p>
  `;
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: stationName,
  });
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}
