

function num_word(value, words) {
	value = Math.abs(value) % 100;
	var num = value % 10;
	if (value > 10 && value < 20) return words[2];
	if (num > 1 && num < 5) return words[1];
	if (num == 1) return words[0];
	return words[2];
}

function myLockBody() {
	$('html').addClass('with-fancybox');
	$('body').addClass('hide-scrollbar');
}
function myUnlockBody() {
	$('html').removeClass('with-fancybox');
	$('body').removeClass('hide-scrollbar');
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



	$('.js-images-slider').each(function () {

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


		var selectorRSThatNeedChangeMax = rs.attr('data-change-other-max-by-val');

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


			if (typeof (selectorRSThatNeedChangeMax) !== 'undefined') {
				var targetSlider = $(selectorRSThatNeedChangeMax);
				if (is_single && targetSlider.length > 0) {
					if (typeof (targetSlider[0].noUiSlider) !== 'undefined') {
						/*console.log({range: {
							'min':targetSlider[0].noUiSlider.options.range.min,
							'max': value
						}});*/

						targetSlider[0].noUiSlider.updateOptions({
							range: {
								'min': targetSlider[0].noUiSlider.options.range.min,
								'max': clearStrAndParseInt(value)
							}
						});
					}
					else {
						//console.log('no init');

					}

				}
			}


		});


		slider.on('change', function () {
			if (is_single) {
				rs_inp_single.trigger('rsChange');

			} else {
				rs_inp_l.trigger('rsChange');
				rs_inp_r.trigger('rsChange');
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



	$('.js-call-me-modal').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		Fancybox.show([{ src: "#call-me-modal", type: "inline", closeButton: false }]);
	});

	$('.js-answer-modal').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		Fancybox.show([{ src: "#answer-modal", type: "inline", closeButton: false }]);
	});

	autosize($('.js-textarea-autosize'));

	$('.js-open-pw-banks-modal').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();

		$('#banks-modal').addClass('pw-banks-wrap--modal-opened');
		myLockBody();
	});
	$('.js-pw-banks-modal-close').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('#banks-modal').removeClass('pw-banks-wrap--modal-opened');
		myUnlockBody();
	});

	$('.js-phonemask').each(function () {
		var phoneIm = new Inputmask("+7 (999) 999-99-99");
		phoneIm.mask($(this)[0]);

	});

	function clearStrAndParseInt(str) {
		return parseInt(str.replaceAll(/[^\d]/g, ''));
	}

	$('.js-pw-section').each(function () {
		var section = $(this),
			banks = section.find('.js-bank'),
			programSelect = section.find('.js-pw-select-program'),
			costInp = section.find('.js-pw-input-cost'),
			firstPaymentInp = section.find('.js-pw-input-firstPayment'),
			termInp = section.find('.js-pw-input-term'),
			programs = window.pwPrograms;



		var bankRateFormat = wNumb({
			suffix: '%',
			//decimals: 3,
		});
		var bankPaymentFormat = wNumb({
			thousand: ' ',
			decimals: 0,
		});

		section.on('needRecalc', function () {
			var programId = parseInt(programSelect.val());
			if (typeof (programs[programId]) !== 'undefined') {
				var program = programs[programId];
				var banksIdsForThisProgram = Object.keys(program.banks).map(k => parseInt(k));
				var cost = clearStrAndParseInt(costInp.val()),
					firstPayment = clearStrAndParseInt(firstPaymentInp.val()),
					term = clearStrAndParseInt(termInp.val());


				banks.each(function () {
					var bank = $(this),
						id = parseInt(bank.attr('data-id'));
					if (banksIdsForThisProgram.includes(id)) {
						var bankRate = parseFloat(program.banks[id]);
						var bankPayment = eval(program.formula);
						bank.find('.js-bank-payment span').html(bankPaymentFormat.to(bankPayment));
						bank.find('.js-bank-rate').html(bankRateFormat.to(bankRate));
						bank.removeClass('pw-bank--hidden');
					}
					else {
						bank.find('.js-bank-payment span').html('');
						bank.find('.js-bank-rate').html('');
						bank.addClass('pw-bank--hidden');
					}
				});
			}
			else {
				alert('error  информация о программе отсутствует');
			}


		}).trigger('needRecalc');

		function triggerRecalc() {
			section.trigger('needRecalc');

		}
		debouncedTriggerRecalc = debounce(triggerRecalc, 200);

		programSelect.add(costInp).add(firstPaymentInp).add(termInp).on('change rsChange', function () {
			debouncedTriggerRecalc();
		});
	});



	if (window.matchMedia('(min-width:960px)').matches) {
		$('.js-banks-simplebar').each(function () {
			var simpleBar = new SimpleBar($(this)[0], {
				autoHide: false
			});

		});
	}




	$(window).on("resize", function () {
		if (window.matchMedia('(min-width:961px)').matches) {
			$('.js-banks-simplebar:not([data-simplebar="init"]').each(function () {
				var simpleBar = new SimpleBar($(this)[0], {
					autoHide: false
				});
			});
		}
	});



	if($('.js-favourite-toggle').length>0){
		var favouriteApartments=Cookies.get('favouriteApartments');
		if(typeof(favouriteApartments)!=='undefined'){
			favouriteApartments=JSON.parse(favouriteApartments);
			$('.js-favourite-toggle').each(function(){
				var thisapartmentId=$(this).attr('data-apartment-id');
				if(favouriteApartments.includes(thisapartmentId)){
					$(this).addClass('favourite-toggle--active')
				}
			})
		}


	}

	$('.js-favourite-toggle').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var thisapartmentId=$(this).attr('data-apartment-id');
		var current=Cookies.get('favouriteApartments');



		if(typeof(current)!=='undefined' && current!==""){
			current=JSON.parse(current);

			indexInArray = current.indexOf(thisapartmentId);
			if (indexInArray > -1) {
				current.splice(indexInArray, 1);
				$(this).removeClass('favourite-toggle--active');
				if($(this).closest('#favourites').length>0){
					$(this).closest('.apartment-card').remove();
				}
			}
			else{
				current.push(thisapartmentId);
				$(this).addClass('favourite-toggle--active');
				/*current.filter(function(value, index, array) {
					return array.indexOf(value) === index;
				});*/
			}
			Cookies.set('favouriteApartments', JSON.stringify(current), { expires: 365 });

		}
		else{
			Cookies.set('favouriteApartments', JSON.stringify([thisapartmentId]), { expires: 365 });
			$(this).addClass('favourite-toggle--active');

		}


	});
});