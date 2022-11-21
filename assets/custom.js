var bundle_step = 0;
var current_fs, next_fs;
var add_to_cart = '';
var category = '';
var board_category = '';
var case_category = ''

// First Landing screen
$(".bundle-start").click(function(){
  current_fs = $(this).parents("section");
  next_fs = $("#progressbar").parents("section").next();
  $("#progressbar").show()
  next_fs.addClass("active-section").show();
  current_fs.removeClass("active-section").hide();
})

// Board screen
$(".section-gallery.bundle-section .bundle-next").click(function(){

  $(this).attr("category", $(".active-section .gallery__item.active").attr("category"))
  $(".active-section .gallery__item.active").each(function(){
    if ($(".active-section .bundle-board").length){
      board_category = $(this).attr("category");
      console.log("board_category", board_category);
    }
    
    category += $(this).attr("category") + ' ';
  });
  console.log("category: ", category);
  
  bundle_step += 1;
  current_fs = $(this).parents("section");
  next_fs = $(this).parents("section").next();
  $("#progressbar li").eq($(".bundle-section").index(current_fs)).addClass("active");
  next_fs.addClass("active-section").attr("category", category).show();
  current_fs.removeClass("active-section").hide();
  
  // show & hide products
  $(".active-section .product-block").attr("show", "true")
  $(".active-section .product-block").each(function(){
      if ($(this).attr("class").indexOf(board_category)==-1){
        $(this).css("display", "none");
        $(this).attr("show", "false")
      }
  })
  if ($(".active-section .product-block[show='true']").length == 0){
    $(".active-section .no-products").css("display", "block");
  }

})

// Product section
$(".section-featured-collection.bundle-section .bundle-next").click(function(){
  $(".active-section .product-block.active").each(function(){
    add_to_cart += 'id=' + $(this).attr("variant-id") + '&quantity=1&';
    addItemToCart( $(this).attr("variant-id"), 1);
  });
  console.log("query string: ", add_to_cart);
  
  bundle_step += 1;
  current_fs = $(this).parents("section");
  next_fs = $(this).parents("section").next();
  $("#progressbar li").eq($(".bundle-section").index(current_fs)).addClass("active");
  next_fs.addClass("active-section").attr("category", category).show();
  current_fs.removeClass("active-section").hide();

  // show & hide products
  $(".active-section .product-block").attr("show", "true")
  $(".active-section .product-block").each(function(){
    if ($(this).attr("class").indexOf(board_category)==-1){
      $(this).css("display", "none");
      $(this).attr("show", "false")
    }

  })
  if ($(".active-section .product-block[show='true']").length == 0){
    $(".active-section .no-products").css("display", "block");
  }

});

// Complete
$(".bundle-complete").click(function(){
  $(".active-section .product-block.active").each(function(){
    add_to_cart += 'id='+$(this).attr("variant-id") + '&quantity=1';
    addItemToCart( $(this).attr("variant-id"), 1);
  });
  console.log(add_to_cart);
  window.location.href = "/cart";
});

function addItemToCart(variant_id, qty) {
  data = {
    "id": variant_id,
    "quantity": qty
  }
  
  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
  });
}

// Image item selection
$(".bundle-section .gallery__item").click(function(){
  $(".bundle-section .gallery__item").removeClass("active");
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }
  else{
    $(this).addClass("active");
  }
})

// Product & Swatch load
$(".bundle-section .product-block").each(function(){
  var product = $(this);
  if (product.attr("quantity")== '0'){
    product.remove();
  }
  if (product.find(".product-swatch-inline span").length < 2){
    product.addClass("no-variants");
  }
  else{
    product.addClass("has-variants");
  }
  for (let i = 0; i < product.find(".product-swatch-inline span").length; i++) {
    if(product.find("option:nth-child("+(i+1)+")").attr("data-stock") == "out"){
      product.find(".product-swatch-inline span:nth-child("+(i+1)+")").remove();
    }
    else{
      product.find(".product-swatch-inline span:nth-child("+(i+1)+")").attr("variant-id", product.find("option:nth-child("+(i+1)+")").attr("value"));
    }
  }
})

// Product selection
$(".bundle-section .product-block .product-container").click(function(){
  console.log("2")
  $(".bundle-section a").attr("href", "");
  if($(this).parents(".product-block").hasClass("active")){
    $(this).parents(".product-block").find(".product-swatch-inline span").removeClass("active");
    $(this).parents(".product-block").removeClass("active").addClass("inactive");

  }
  else{
    $(this).parents(".product-block").removeClass("inactive").addClass("active");
    if ($(this).parents(".product-block").hasClass("has-variants")){
      $(this).parents(".product-block").find(".product-swatch-inline span:first-child").addClass("active");
    }
  }
  
})

// Product swatch selection
$(".bundle-section .product-block .swatch-container .product-swatch-inline span").click(function(){
  console.log("1")
  if ($(this).parents(".product-block").hasClass("active")){
    $(".bundle-section a").attr("href", "");
    $(this).parents(".product-swatch-inline").find("span").removeClass("active")
    $(this).addClass("active");
    $(this).parents(".product-block").attr("variant-id", $(this).attr("variant-id"))
  }
  

})