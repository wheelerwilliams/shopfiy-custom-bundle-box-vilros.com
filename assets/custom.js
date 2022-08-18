var bundle_step = 0;
var current_fs, next_fs;

$(".bundle-start").click(function(){
  current_fs = $(this).parents("section");
  next_fs = $("#progressbar").parents("section").next();
  $("#progressbar").show()
  next_fs.show();
  current_fs.hide();
})

$(".bundle-next").click(function(){
  bundle_step += 1;
  current_fs = $(this).parents("section");
  next_fs = $(this).parents("section").next();
  $("#progressbar li").eq($(".bundle-section").index(current_fs)).addClass("active");
  next_fs.show();
  current_fs.hide();
})


$(".bundle-complete").click(function(){
    addItemToCart( 39311716024414, 1, "1", "Months");
});

function addItemToCart(variant_id, qty, frequency, unit_type) {
  data = {
    "id": variant_id,
    "quantity": qty
  }
  
  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() { 
      document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true  
     }));
    }
  });
  document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
      bubbles: true      
   }));
}


$(".bundle-section .gallery__item").click(function(){
  $(".bundle-section .gallery__item").removeClass("active");
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }
  else{
    $(this).addClass("active");
  }
})

$(".bundle-section .product-block").click(function(){
  $(".bundle-section a").attr("href", "");
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }
  else{
    $(this).addClass("active");
  }
})
