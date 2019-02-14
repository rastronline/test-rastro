//const constants = require("../../constants");

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
  console.log(`categoria escogida ${categoryId}`);

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

$(document).ready(function() {

  if ($(".time-auction").length > 0) {

  const auctionsCards = $(".time-auction");
  console.log("auctions...", auctionsCards)
  // currentTime = new Date;
  let auctionDate;
  let timeRemaining = new Date;;
  const AUCTION_TIME_LIMIT = 24*60*60*1000;
  //debugger;
  
  setInterval(function() {
    /*  $(".time-auction").forEach(() => {
      auctionDate = $(this).attr("data-auction").getTime();
      timeRemaining = AUCTION_TIME_LIMIT - (currentTime - auctionDate)
      if (timeRemaining > 0) {
        console.log(timeRemaining);
        $(auctionsCards)[0].text = setTime(timeRemaining);
      }
    }); */
    
    for (let i = 0; i < auctionsCards.length; i++) {
      let currentTime = Date.now();
      auctionDate = new Date($($(auctionsCards)[i]).attr("data-auction")).getTime();
      console.log ("auctionDate...", auctionDate)
      console.log ("currentTime...", currentTime)
      
      timeRemaining = AUCTION_TIME_LIMIT - (currentTime - auctionDate)
      //timeRemaining.setHours(24 + currentTime.getHours() - auctionDate.getHours())
     // if (timeRemaining.getMilliseconds() > 0)  {
        console.log(timeRemaining);
        
        let rest = new Date(timeRemaining);
        //rest = rest.setMilliseconds(timeRemaining)
        $($(".time-auction")[i]).text(setTime(rest));
        $($(".time-auction")[i]).fadeIn(100);
        setTimeout(function() {
          $($(".time-auction")[i]).fadeOut(100);
        }, 1500)

      //}
    }
  }, 3000);

}
});

