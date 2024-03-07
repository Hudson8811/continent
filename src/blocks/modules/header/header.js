$(function(){

    $('.js-mega-menu-trigger').on('click', function () {
        $('.mega-menu-wrap').toggleClass('mega-menu-wrap--active');
    });
    $('.site-header').siblings().on('click', function () {
        $('.mega-menu-wrap').removeClass('mega-menu-wrap--active');
    });

    $('.js-mob-menu-trigger').on('click', function () {
        $(this).toggleClass('sh-burger--active');
    });




});