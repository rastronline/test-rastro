var geocoder;
var map;

/* //HE TENIDO QUE COMENTAR ESTAS DOS LINEAS DE MOMENTO PORQUE EL JS ME FALLA
var userLat = document.getElementById("latitude").value || 40.416775;
var userLng = document.getElementById("longitude").value || 3.703790; */

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

$(".card-category").click(function() {
  const categoryId = this.dataset.category;

  $(this).toggleClass("selected");

  if ($(this).hasClass("selected")) {
    console.log("hago una nuevo input")
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


$(".category").click(function() {
  
  const categoryId = this.dataset.category;
  console.log(`categoria escogida ${categoryId}`)

  $(".category").addClass("disabled");
  $(this).toggleClass("selected");

  $("#category-filter").val(categoryId);
  //console.log(`valor del input ${categoryId}`)

  $(".search-btn").click();
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


/* axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}); */

/* 
<script>

  const button = document.getElementById('like')
  button.onClick = function(event) {
    setLike(data)
  }

  function setLike(data) {
    axios.post(url, {
      'Content-Type': 'application/json',
      'data': JSON.stringify(data)
    })
    .then(result => {
      result.data
      document.getElementById('like').setAttribute('class', 'active')
    })
    .catch(error => error)
  } 

</script> */




//const favIcon = $(".fav-icon");

$(".fav-btn").click(function(event) {
  
  const favIcon = event.target;
  /* console.log("entroo", this)
  console.log("entroo", favIcon)
  //debugger;
  const articleId = favIcon.dataset.value;
  console.log("y value", articleId) */
  
  $(favIcon).toggleClass("fav-selected")
  //linkFav.firstChild.addClass("selected");
  const articleId = favIcon.dataset.value;
  if ($(favIcon).hasClass("fav-selected")) {
    
    console.log("y ahora en el if")
    
    axios.post(`/articles/${articleId}/addToFav`)
      .then(() => console.log("ok"))
      .catch(err => console.log(err))
  } else {
    axios.post(`/articles/${articleId}/removeFromFav`)
    .then(() => console.log("ok"))
    .catch(err => console.log(err))
  }

});

/* function handleFav(event) {

  const articleId = event.target.value;
  axios.post(`/users/fav/${articleId}`)
  .then(response => {
    if (response.data.OK) {
      favBtn.classList.add('favorite');
    }
  })
  .catch(error => console.log(error));
} */


/* var favBtn = document.getElementById('fav-btn')

function doFav(event) {
    const restaurantId = event.target.value;
    axios.post(`/users/fav/${restaurantId}`)
        .then(response => {
            if (response.data.OK) {
                favBtn.classList.add('favorite');
            }
        })
        .catch(error => console.log(error));
}

favBtn.addEventListener('click', doFav) */


