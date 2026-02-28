(function ($) {
    "use strict";

    /* [ Load page ] */
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
        transition: function (url) { window.location.href = url; }
    });

    /* [ Back to top ] */
    var windowH = $(window).height() / 2;

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display', 'flex');
        } else {
            $("#myBtn").css('display', 'none');
        }
    });

    $('#myBtn').on("click", function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    /* [ Fixed Header ] */
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    var posWrapHeader = $('.top-bar').length > 0 ? $('.top-bar').height() : 0;

    if ($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top', 0);
    } else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
    }

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top', 0);
        } else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top', posWrapHeader - $(this).scrollTop());
        }
    });

    /* [ Menu mobile ] */
    $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    arrowMainMenu.each(function () {
        $(this).on('click', function () {
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        });
    });

    $(window).resize(function () {
        if ($(window).width() >= 992) {
            if ($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display', 'none');
                $('.btn-show-menu-mobile').removeClass('is-active');
            }
            $('.sub-menu-m').css('display', 'none');
            arrowMainMenu.removeClass('turn-arrow-main-menu-m');
        }
    });

    /* [ Show / hide modal search ] */
    $('.js-show-modal-search').on('click', function () {
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity', '0');
    });

    $('.js-hide-modal-search').on('click', function () {
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity', '1');
    });

    $('.container-search-header').on('click', function (e) {
        e.stopPropagation();
    });

    /* [ Isotope ] */
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({ filter: filterValue });
        });
    });

    $(window).on('load', function () {
        $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine: 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    $('.filter-tope-group button').on('click', function () {
        $('.filter-tope-group button').removeClass('how-active1');
        $(this).addClass('how-active1');
    });

    /* [ Filter / Search product ] */
    $('.js-show-filter').on('click', function () {
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if ($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }
    });

    $('.js-show-search').on('click', function () {
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if ($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }
    });

    /* [ Cart Panel Toggle ] */
    $('.js-show-cart').on('click', function () {
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click', function () {
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /* [ Sidebar Toggle ] */
    $('.js-show-sidebar').on('click', function () {
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click', function () {
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /* ========== Cart Logic ========== */
   

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartSidebar(); // Render on load


    function addProductToCart(name, price, image) {
        cart.push({ name, price, image });
        localStorage.setItem('cart', JSON.stringify(cart));
        $('.icon-header-noti.js-show-cart').attr('data-notify', cart.length);
        updateCartSidebar();
    }

    function updateCartSidebar() {
        const $cartList = $('.header-cart-wrapitem');
        const $cartTotal = $('.header-cart-total');
        $cartList.empty();
        let total = 0;

        cart.forEach(item => {
            total += parseFloat(item.price);
            $cartList.append(`
                <li class="header-cart-item flex-w flex-t m-b-12">
                    <div class="header-cart-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="header-cart-item-txt p-t-8">
                        <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                            ${item.name}
                        </a>
                        <span class="header-cart-item-info">
                            Rs: ${parseFloat(item.price).toFixed(2)}
                        </span>
                    </div>
                </li>
            `);
        });

        $cartTotal.text(`Total: Rs ${total.toFixed(2)}`);
    }

    $(document).on('click', '.js-add-to-cart', function (e) {
        e.preventDefault();
        const $block = $(this).closest('.block2');
        const name = $block.find('.js-name-b2').text().trim();
        const priceText = $block.find('.stext-105').text().trim().replace('Rs:', '').replace(',', '');
        const price = parseFloat(priceText);
        const image = $block.find('img').attr('src');

        addProductToCart(name, price, image);

        $(this).text('Added!').addClass('added-to-cart');
        setTimeout(() => {
            $(this).text('Add to Cart').removeClass('added-to-cart');
        }, 2000);
    });

    /* [ Rating ] */
    $('.wrap-rating').each(function () {
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        item.on('mouseenter', function () {
            var index = item.index(this);
            for (let i = 0; i <= index; i++) {
                $(item[i]).removeClass('zmdi-star-outline').addClass('zmdi-star');
            }
            for (let i = index + 1; i < item.length; i++) {
                $(item[i]).removeClass('zmdi-star').addClass('zmdi-star-outline');
            }
        });

        item.on('click', function () {
            rated = item.index(this);
            input.val(rated + 1);
        });

        $(this).on('mouseleave', function () {
            item.each(function (i) {
                if (i <= rated) {
                    $(this).removeClass('zmdi-star-outline').addClass('zmdi-star');
                } else {
                    $(this).removeClass('zmdi-star').addClass('zmdi-star-outline');
                }
            });
        });
    });

    /* [ Modal 1 ] */
    $('.js-show-modal1').on('click', function (e) {
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click', function () {
        $('.js-modal1').removeClass('show-modal1');
    });

})(jQuery);
