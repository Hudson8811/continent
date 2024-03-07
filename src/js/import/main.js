function num_word(value, words) {
	value = Math.abs(value) % 100;
	var num = value % 10;
	if (value > 10 && value < 20) return words[2];
	if (num > 1 && num < 5) return words[1];
	if (num == 1) return words[0];
	return words[2];
}

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
		var rs_inp_single = rs.find('.js-range-slider__inp-single');
		var rs_range = rs.find('.js-range-slider__range');

		var start_l = parseFloat(rs.attr('data-start-left'));
		var start_r = parseFloat(rs.attr('data-start-right'));
		var min = parseFloat(rs.attr('data-min'));
		var max = parseFloat(rs.attr('data-max'));
		var prefix = rs.attr('data-prefix');
		var suffix = rs.attr('data-suffix');
		var format = rs.attr('data-format');
		var step = rs.attr('data-step');
		var is_single = rs.attr('data-single') === 'true';


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
			connect: true,
			range: {
				'min': min,
				'max': max
			},


			pips: false
		};

		if (format === 'int') {
			slider_params.step = parseInt(step);
			var parameters = {
				thousand: ' ',
				decimals: 0
			};
			if (prefix !== '') {
				parameters.prefix = prefix;
			}
			if (suffix === 'year') {
				suffix = '';
				parameters.edit = function (value) {
					return value + ' ' + num_word(value, ['год', 'года', 'лет']);;
				}
			}
			if (suffix !== '') {
				parameters.suffix = suffix;
			}


			slider_params.format = wNumb(parameters);
		}
		else if (format === 'float') {
			slider_params.step = parseFloat(step);
		}

		if (is_single) {
			slider_params.start = [start_l];

			slider_params.connect = [true, false];
		} else {
			slider_params.start = [start_l, start_r];
		}

		var slider = noUiSlider.create(rs_range[0], slider_params);

		slider.on('update', function (values, handle) {

			var value = values[handle];
			if (is_single) {
				if (handle === 0) {
					rs_inp_single[0].value = value;
				}
			}
			else {
				if (handle === 0) {
					rs_inp_l[0].value = value;
				}
				else if (handle === 1) {
					rs_inp_r[0].value = value;
				}
			}
		});
		if (is_single) {
			rs_inp_single[0].addEventListener('change', function () {
				slider.set([this.value]);
			});

		} else {
			rs_inp_l[0].addEventListener('change', function () {
				slider.set([this.value, null]);
			});
			rs_inp_r[0].addEventListener('change', function () {
				slider.set([null, this.value]);
			});
		}
	});


	function sel2WithIconsTheme(state) {
		if (!state.id) {
			return state.text;
		}
		var imgSrc = $(state.element).attr("data-img-src");
		if (typeof imgSrc !== "undefined" && imgSrc.length > 0) {
			var $state = $(
				'<span><img src="' +
				$(state.element).attr("data-img-src") +
				'" class="select-item-img-icon" />' +
				state.text +
				"</span>"
			);
		} else {
			var $state = $("<span>" + state.text + "</span>");
		}

		return $state;
	}

	$(".js-simple-select2").each(function (index) {
		var placeholder = $(this).attr("data-placeholder");
		if (typeof placeholder !== "undefined" && placeholder.length > 0) {
			$(this).addClass("simple-select2--placeholder-selected");
		}

		var style = $(this).attr("data-style");
		if (!(typeof style !== "undefined" && style.length > 0)) {
			style = '';
		}


		var select = $(this);

		$(this)
			.select2({
				language: "ru",
				theme: "custom-theme " + style,
				minimumResultsForSearch: Infinity,
				//width: '100%',
				dropdownAutoWidth: true,
				width: "auto",
				templateResult: sel2WithIconsTheme,
				templateSelection: sel2WithIconsTheme,
				dropdownParent: $(this).siblings(".simple-select2-items-wrapper")
			})
			.on("select2:open", function (e) {
				$(this)
					.siblings(".simple-select2-items-wrapper")
					.addClass("simple-select2-items-wrapper--show");
			})
			.on("select2:closing", function (e) {
				if ($(this).attr("data-close-anvaliable") !== "1") {
					e.preventDefault();
					select.attr("data-close-anvaliable", "1");
					select
						.siblings(".simple-select2-items-wrapper")
						.removeClass("simple-select2-items-wrapper--show");
					setTimeout(function () {
						select.select2("close");
					}, 350);
				} else {
					$(this).attr("data-close-anvaliable", "2");
				}
				//$(this).select2('close');
			})
			.on("select2:select", function (e) {
				$(this).removeClass("simple-select2--placeholder-selected");
			});
	});

	//вариант для внешнего выпадающего списка(не лежащего рядом с селектом, а добавляемого в конец body)
	$(".js-simple-select2-outer-dropdown").each(function (index) {
		var placeholder = $(this).attr("data-placeholder");
		if (typeof placeholder !== "undefined" && placeholder.length > 0) {
			$(this).addClass("simple-select2--placeholder-selected");
		}

		var style = $(this).attr("data-style");
		if (!(typeof style !== "undefined" && style.length > 0)) {
			style = '';
		}
		var select = $(this);

		$(this)
			.select2({
				language: "ru",
				theme: "custom-theme " + style,
				minimumResultsForSearch: Infinity,
				width: '100%',
				//dropdownAutoWidth: true,
				//width: "auto",
				templateResult: sel2WithIconsTheme,
				templateSelection: sel2WithIconsTheme
			})
			.on("select2:opening", function (e) {
				// $(this).addClass("simple-select2-items-wrapper--show");
			})
			.on("select2:closing", function (e) {
				if ($(this).attr("data-close-anvaliable") !== "1") {
					e.preventDefault();
					select.attr("data-close-anvaliable", "1");
					// select.removeClass("simple-select2-items-wrapper--show");
					setTimeout(function () {
						select.select2("close");
					}, 350);
				} else {
					$(this).attr("data-close-anvaliable", "2");
				}
				//$(this).select2('close');
			})
			.on("select2:select", function (e) {
				$(this).removeClass("simple-select2--placeholder-selected");
			});
	});

	if ($('.js-filters-row').length > 0) {
		var row = $('.js-filters-row');
		var row_hidden_h = row.outerHeight();


		$('.js-twi-switch--more-filters').on('click', function () {
			if ($(this).hasClass('twi-switch--more-filters--opened')) {
				$(this).removeClass('twi-switch--more-filters--opened');

				row.animate({ height: row_hidden_h }, 300);
			}
			else {
				$(this).addClass('twi-switch--more-filters--opened');

				row.animate({ height: row[0].scrollHeight }, 300);
			}
		});
	}




	Fancybox.bind("[data-fancybox]", {
		// Your custom options
	});



	$('.js-call-me-modal').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		Fancybox.show([{ src: "#call-me-modal", type: "inline",closeButton:false }]);
	})
});