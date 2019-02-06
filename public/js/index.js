var geocoder;
var map;

function initMap() {
  // Create the map.
  geocoder = new google.maps.Geocoder();
  
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 10,
    center: latlng
  }
    map = new google.maps.Map(document.getElementById('map'), mapOptions); {
  }

}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
          
      });
    var latlng = [];
    latlng.push(results[0].geometry.location.lat().toFixed(3));
    latlng.push(results[0].geometry.location.lng().toFixed(3));
      
  
      
      
        document.getElementById('lat-long').value = latlng
      
      
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

$(".card-category").click(function() {
  const categoryId = this.dataset.category;

  $(this).toggleClass('selected');

  if ($(this).hasClass('selected')) {    
    const newInput = $(document.createElement('input'))
                        .attr("name", "hobbies")
                        .attr("value", categoryId)
                        .attr("id", `category-${categoryId}`)
                        .css("display", "none");

    $(".edit-user-form").append(newInput);
  } else {
    $(`#category-${categoryId}`).remove();
  }
});

    
  