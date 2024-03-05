$(function () {
    $('.js-mega-menu-trigger').on('click', function () {
        $('.mega-menu-wrap').toggleClass('mega-menu-wrap--active');
    });
    $('.site-header').siblings().on('click', function () {
        $('.mega-menu-wrap').removeClass('mega-menu-wrap--active');
    });



    $('.js-ftb-slider').each(function () {

        var swiper = new Swiper($(this)[0], {
            pagination: {
                el: $(this).find('.js-swiper-pagination')[0],
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="slider-controls-pagination__digit slider-controls-pagination__digit--current ' + currentClass + '"></span>' +
                            '<span class="slider-controls-pagination__delimiter"></span> ' +
                            '<span class="slider-controls-pagination__digit slider-controls-pagination__digit--total ' + totalClass + '"></span>';
                }
            },
            navigation: {
                nextEl: $(this).find('.js-swiper-button-next')[0],
                prevEl: $(this).find('.js-swiper-button-prev')[0],
            },
        });
    });







});