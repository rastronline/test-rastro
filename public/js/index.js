var geocoder;
var map;
var userLat = document.getElementById("latitude").value || 43;
var userLng = document.getElementById("longitude").value || -3.7;
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
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: latlng,
    map: map
  });
}

function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == "OK") {
      postal = results[0].address_components[0].short_name;
      city = results[0].address_components[1].short_name;

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

$(".card-category").click(function() {
  const categoryId = this.dataset.category;

  $(this).toggleClass("selected");

  if ($(this).hasClass("selected")) {
    const newInput = $(document.createElement("input"))
      .attr("name", "hobbies")
      .attr("value", categoryId)
      .attr("id", `category-${categoryId}`)
      .css("display", "none");

    $(".edit-user-form").append(newInput);
  } else {
    $(`#category-${categoryId}`).remove();
  }
});

// $('.add-fav').click(function() {
//   debugger;
//  /*  $(this).toggleClass('handle-fav');
//   $('.remove-fav').toggleClass('hande-fav'); */
//   $(this).toggle();
//   $('.remove-fav').toggle();
// })

// $('.remove-fav').click(function() {
// /*   $(this).toggleClass('handle-fav');
//   $('.add-fav').toggleClass('hande-fav'); */
//   $(this).toggle();
//   $('.add-fav').toggle();
// })

/* $(document).ready(function(){
	
	$("input[type=submit]").click(function() {
    var accion = $(this).attr('dir');
    console.log("lo mandamos a ", accion);
		$('form').attr('action', accion);
		$('form').submit();
	});
	
}); */
