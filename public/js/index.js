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
