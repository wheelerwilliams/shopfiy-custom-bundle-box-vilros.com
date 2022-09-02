var bundle_step = 0;
var current_fs, next_fs;
var add_to_cart = '';
var category = '';
  
$(".bundle-start").click(function(){
  current_fs = $(this).parents("section");
  next_fs = $("#progressbar").parents("section").next();
  $("#progressbar").show()
  next_fs.addClass("active-section").show();
  current_fs.removeClass("active-section").hide();
})

$(".section-gallery.bundle-section .bundle-next").click(function(){
  $(".active-section .gallery__item.active").each(function(){
    category += $(this).attr("category") + '&';
  });
  console.log("category: ", category);
  
  bundle_step += 1;
  current_fs = $(this).parents("section");
  next_fs = $(this).parents("section").next();
  $("#progressbar li").eq($(".bundle-section").index(current_fs)).addClass("active");
  next_fs.addClass("active-section").attr("category", category).show();
  current_fs.removeClass("active-section").hide();
})

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
  next_fs.addClass("active-section").show();
  current_fs.removeClass("active-section").hide();
  
});

$(".bundle-complete").click(function(){
  $(".active-section .product-block.active").each(function(){
    add_to_cart += 'id='+$(this).attr("variant-id") + '&quantity=1';
  });
  console.log(add_to_cart);
  window.location.href = "/cart/add?" + add_to_cart;
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
