function initMap() {
    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 40.4, lng: -3.7},
      mapTypeId: 'terrain'
    });

      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: 40.4, lng: -3.7},
            radius:1000
      });
    }
  