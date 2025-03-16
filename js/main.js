'use strict';
console.log("main.js đã được tải thành công!");
(function ($) {

    // Screen Pre Loader
    $(window).on('load', function () {
        $(".load").fadeOut();
        $("#preload").delay(100).fadeOut("slow");
    });

    // Background Image Set

    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //	Mobile Navigation    

    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });


    //Main Here Slider

    $(".hero-items").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });


    //Product Images Slider

    $(".product-slider").owlCarousel({
        loop: true,
        margin: 25,
        nav: true,
        items: 4,
        dots: true,
        navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            992: {
                items: 2,
            },
            1200: {
                items: 3,
            }
        }
    });

    //    Product Details image Slider

    $(".ps-slider").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        items: 3,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });


    //  Size Selector Radio Btn

    $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").on('click', function () {
        $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").removeClass('active');
        $(this).addClass('active');
    });


	//  Product Details Images Show  Zoom

        $('.product-thumbs-track .pt').on('click', function () {
        $('.product-thumbs-track .pt').removeClass('active');
        $(this).addClass('active');
        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product-big-img').attr('src');
        if (imgurl != bigImg) {
            $('.product-big-img').attr({ src: imgurl });
            $('.zoomImg').attr({ src: imgurl });
        }
    });

    $('.product-pic-zoom').zoom();


   








    //	Product Quantity change
    $(document).ready(function () {
        // Thêm nút tăng/giảm số lượng vào mỗi ô số lượng
        $(".pro-qty").each(function () {
            $(this).prepend('<span class="dec qtybtn">-</span>');
            $(this).append('<span class="inc qtybtn">+</span>');
        });
    
        // Xử lý khi nhấn nút + hoặc -
        $(".pro-qty").on("click", ".qtybtn", function () {
            var $button = $(this);
            var parent = $button.closest(".pro-qty");
            var productId = parent.data("id");
            var input = parent.find("input");
            var oldValue = parseInt(input.val());
            var newVal = oldValue;
    
            if ($button.hasClass("inc")) {
                newVal = oldValue + 1;
            } else if ($button.hasClass("dec")) {
                newVal = Math.max(1, oldValue - 1);
            }
    
            input.val(newVal);
               // 🔥 Cập nhật tổng giá của sản phẩm ngay lập tức
        var price = parseFloat($("#total-" + productId).attr("data-price"));
        $("#total-" + productId).text("VND " + (price * newVal).toLocaleString('vi-VN'));
        });
    
        // Xử lý khi nhấn "Update Cart"
        $(".up-cart").on("click", function (e) {
            e.preventDefault(); // Ngăn load lại trang
    
            var cartData = [];
    
            $(".pro-qty").each(function () {
                var productId = $(this).data("id");
                var qty = $("#qqty-" + productId).val();
    
                if (productId && qty) {
                    cartData.push({ p_id: productId, qty: qty });
                }
            });
    
            if (cartData.length > 0) {
                $.ajax({
                    url: "shopping-cart.php",
                    type: "POST",
                    data: { update_cart: 1, cart: cartData },
                    success: function (response) {
                        if (response.includes("Success")) {
                            alert("🛒 Giỏ hàng đã được cập nhật!");
                            location.reload(); // Tải lại trang để cập nhật giá tiền
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("❌ AJAX Error:", error);
                    }
                });
            }
        });
    });
     
})(jQuery);



