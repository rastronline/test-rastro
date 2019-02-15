var geocoder;
var map;

//HE TENIDO QUE COMENTAR ESTAS DOS LINEAS DE MOMENTO PORQUE EL JS ME FALLA
if (document.getElementById("map")) {
var userLat = document.getElementById("latitude").value || 40.416775;
var userLng = document.getElementById("longitude").value || -3.70379;
}

var marker;
var postal;
var city;

function initMap() {
  // Create the map.
  geocoder = new google.maps.Geocoder();

  var latlng = new google.maps.LatLng(userLat, userLng);

  var mapOptions = {
    zoom: 14,
    center: latlng
  };
  if (document.getElementById("map")) {

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: latlng,
    map: map
  });
}
}

function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == "OK") {
      postal = results[0].address_components[0].long_name;
      city = results[0].address_components[1].long_name;

      map.setCenter(results[0].geometry.location);

      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        map: map,
        position: results[0].geometry.location
      });

      var lat = results[0].geometry.location.lat().toFixed(3);
      var lng = results[0].geometry.location.lng().toFixed(3);

      document.getElementById("latitude").value = lat;
      document.getElementById("longitude").value = lng;
      document.getElementById("address").value = postal + ", " + city;
      console.log(results[0].address_components);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
