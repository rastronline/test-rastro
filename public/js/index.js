//const constants = require("../../constants");

$(".card-category").click(function() {
  const categoryId = this.dataset.category;

  $(this).toggleClass("unselected");

  if (!$(this).hasClass("unselected")) {
    //console.log("hago una nuevo input")
    const newInput = $(document.createElement("input"))
      .attr("name", "hobbies")
      .attr("value", categoryId)
      .attr("id", `category-${categoryId}`)
      .css("display", "none");

    $(".edit-user-form").append(newInput);
  } else {
    $(`#category-${categoryId}`).remove();
  }


//PARA CONTROLAR EL EVENTO DEL "ENTER" EN LOS MAPAS...






  /* const categoryId = this.dataset.category;

  $(this).toggleClass("unselected");

  if (!$(this).hasClass("unselected")) {
    console.log("hago una nuevo input")
    const newInput = $(document.createElement("input"))
      .attr("name", "hobbies")
      .attr("value", categoryId)
      .attr("id", `category-${categoryId}`)
      .css("display", "none");

    $(".edit-user-form").append(newInput);
  } else {
    $(`#category-${categoryId}`).remove();
  } */
});

$(".category").click(function() {
  const categoryId = this.dataset.category;
  //console.log(`categoria escogida ${categoryId}`);

  /* $(".category").addClass("unselected");
  $(this).toggleClass("unselected");
 */
  $("#category-filter").val(categoryId);
  //console.log(`valor del input ${categoryId}`)

  /* axios.post(`/articles/${articleId}/search`)
  .then(() => console.log("ok"))
  .catch(err => console.log(err)) */

  $(".search-btn").click();
});

$(".file-input").change(function() {
  console.log("el texto que hay en el input es", $(".file-input").val()) 
  $("#profile-pic-form").submit();
})

$("#address").change(function() {
  //console.log("e", $(".file-input").text()) 
  //$("#profile-pic-form").submit();
  codeAddress();
})


/* $(".search-by-category").click(function() {
  const categoryId = this.dataset.category;
  console.log(`categoria escogida ${categoryId}`);

  $(".search-by-category").addClass("unselected");
  $(this).toggleClass("unselected");

  $("#category-filter").val(categoryId);
  //console.log(`valor del input ${categoryId}`)

  $(".search-btn").click();
}); */

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

//EVENTOS CLICK PARA EJECUTAR PETICIONES AXIOS

$(".fav-btn").click(function(event) {
  
  const favIcon = event.target;
   console.log("entroo EN EVENTO FAVVV ", this)
  /*console.log("entroo", favIcon)
  //debugger;
  const articleId = favIcon.dataset.value;
  console.log("y value", articleId) */
  
  $(favIcon).toggleClass("fav-selected")
  //linkFav.firstChild.addClass("selected");
  const articleId = favIcon.dataset.value;
  console.log("\ny value", articleId)
  if ($(favIcon).hasClass("fav-selected")) {
    
    console.log("voy por el if(Añadir")
    
    axios.post(`/articles/${articleId}/addToFav`)
      .then(() => console.log("ok"))
      .catch(err => console.log(err))
  } else {
    console.log("voy por el else(QUITAR")
    axios.post(`/articles/${articleId}/removeFromFav`)
    .then(() => console.log("ok"))
    .catch(err => console.log(err))
  }
});

/* $("#on-sale-btn").click(function(event) {
  axios.post("/articles/list")
  .then(() => console.log("ok"))
  .catch(err => console.log(err))
}); */

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




function timeAuction() {

  function twoDigitsNumber (value) {
  
    if ((value + "").length === 1) {
        return ("0" + value);
    } else {
        return (value + "").slice(0,2); // ".slice(0,2) to get only two digits ("for the millisec.)
    }
  };

  function setTime (time) {
    
    const hours = twoDigitsNumber(time.getHours());
    const minutes = twoDigitsNumber(time.getMinutes());
    const seconds = twoDigitsNumber(time.getSeconds());
  
    return (`${hours}:${minutes}:${seconds}`);
  };
  
  //if exists this class in the actual view...
  if ($(".time-auction").length > 0) {
    const auctionsCards = $(".time-auction");
    let auctionDate = new Date;
    let timeRemaining = new Date;
    let currentTime = new Date;
    
    
    let interval = setInterval(function() {
      for (let i = 0; i < auctionsCards.length; i++) {
        currentTime = Date.now();
        auctionDate = new Date($($(auctionsCards)[i]).attr("data-auction")).getTime();
        timeRemaining = AUCTION_TIME_LIMIT - (currentTime + ONE_HOUR - auctionDate)
        timeRemaining = new Date(timeRemaining);
        console.log("TIPO DE DATO timeRemaining => ",typeof timeRemaining.getSeconds(), timeRemaining.getSeconds())


        if ($($(".time-auction")[i]).hasClass("bid")) {
          $($(".time-auction")[i]).text(`QUEDAN ${setTime(timeRemaining)}`);
          console.log($($(".time-auction")[i]).text())
        };

        if (($($(".time-auction")[i]).text() == "QUEDAN 00:00:00") && ($($(".time-auction")[i]).hasClass("bid"))) {
          $($(".time-auction")[i]).removeClass("bid")
          $($(".time-auction")[i]).text("SE HA AGOTADO EL TIEMPO");
          let articleId = $($(".time-auction")[i]).attr("data-article")
          alert("data article", articleId)
          console.log("HA ELIMINADO LA CLASE BID")
          axios.post(`/articles/${articleId}/auctionFinished`)
            .then(() => {
              console.log("EL POST DEL FIN DEL ARTICLO FUNCIONÓ PERFECTAMENTE!!");
            })
            .catch(err => console.log(err))
        }

        for (let i = 0; i < auctionsCards.length; i++) {
          //let thereAreBid = false
          if ($($(".time-auction")[i]).hasClass("bid")) {
            //thereAreBid = true;
            break
          }
          endBid();
        }

        


       /*  if (timeRemaining.getSeconds() > 0) {
          $($(".time-auction")[i]).text(`QUEDAN ${setTime(timeRemaining)}`);

        } else {xios.post(`/articles/${articleId}/auctionFinished`)
            .then(() => {
              console.log("EL POST DEL FIN DEL ARTICLO FUNCIONÓ PERFECTAMENTE!!");
            })
            .catch(err => console.log(err))
          const articleId = $(auctionsCards)[i].dataset.value;
          console.log("LLEGO AL FINAL DEL TIEMPO del ARTICULO", articleId)
          a
          $($(".time-auction")[i]).text("TIEMPO AGOTADO");
          // endBid() */
        }
      //}
    }, 1000);

    function endBid() {
      clearInterval(interval)
    }
  } 
}

$(document).ready(function() {
  timeAuction();
});

