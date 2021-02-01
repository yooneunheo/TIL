var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.52857385480169, lng: 127.0331840846545 },
    zoom: 9,
    streetViewControl: false,
  });

  let markers = stations.features;

  for (var x = 0; x < markers.length; x++) {
    let stationName = markers[x].properties.stopname;
    let longitude = markers[x].geometry.coordinates[0];
    let latitude = markers[x].geometry.coordinates[1];

    dropMarker(latitude, longitude, stationName);
  }
}

function dropMarker(lat, lng, stationName) {
  var location = { lat: lat, lng: lng };
  var contentString = "<h4>" + stationName + "<h4>";
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
