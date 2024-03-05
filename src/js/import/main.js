$(function () {


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

            autoplay: {
                delay: 5000,
            },
        });
    });



    $('.js-range-slider').each(function () {
        var rs = $(this);
        var rs_inp_l = rs.find('.js-range-slider__inp-left');
        var rs_inp_r = rs.find('.js-range-slider__inp-right');
        var rs_range = rs.find('.js-range-slider__range');

        var start_l = parseFloat(rs.attr('data-start-left'));
        var start_r = parseFloat(rs.attr('data-start-right'));
        var min = parseFloat(rs.attr('data-min'));
        var max = parseFloat(rs.attr('data-max'));
        var prefix = rs.attr('data-prefix');
        var suffix = rs.attr('data-suffix');
        var format = rs.attr('data-format');
        var step = rs.attr('data-step');

        if (typeof (prefix) === 'undefined') {
            prefix = '';
        }
        if (typeof (suffix) === 'undefined') {
            suffix = '';
        }
        if (isNaN(min)) {
            min = 0;
        }
        if (isNaN(max)) {
            max = 100;
        }
        if (isNaN(start_l)) {
            start_l = min;
        }
        if (isNaN(start_r)) {
            start_r = max;
        }
        if (typeof (format) === 'undefined') {
            format = 'int';
        }
        if (typeof (step) === 'undefined') {
            step = '1';
        }

        var slider_params = {
            start: [start_l, start_r],
            connect: true,
            range: {
                'min': min,
                'max': max
            },


            pips: {
                mode: 'count',
                values: 2,
                density: -1
            }
        };

        if (format === 'int') {
            slider_params.step = parseInt(step);
            var parameters={
                thousand: ' ',
                decimals: 0
            };
            if(prefix===''){
                parameters.prefix=prefix;
            }
            if(suffix===''){
                parameters.suffix=suffix;
            }

            slider_params.format = wNumb(parameters);
        }
        else if (format === 'float') {
            slider_params.step = parseFloat(step);
        }


        var slider = noUiSlider.create(rs_range[0], slider_params);

        slider.on('update', function (values, handle) {

            var value = values[handle];

            if (handle === 0) {
                rs_inp_l[0].value = value;
            }
            else if (handle === 1) {
                rs_inp_r[0].value = value;
            }
        });
        rs_inp_l[0].addEventListener('change', function () {
            slider.set([this.value, null]);
        });
        rs_inp_r[0].addEventListener('change', function () {
            slider.set([null, this.value]);
        });
    });






});