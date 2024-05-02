

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

$.fn.isXScrollable = function () {
	return this[0].scrollWidth > this[0].clientWidth;
};

$.fn.isYScrollable = function () {
	return this[0].scrollHeight > this[0].clientHeight;
};

$.fn.isScrollable = function () {
	return this[0].scrollWidth > this[0].clientWidth || this[0].scrollHeight > this[0].clientHeight;
};






function refreshFavourites() {
	var favouriteApartments = Cookies.get('favouriteApartments');
	if (typeof (favouriteApartments) !== 'undefined') {
		favouriteApartments = JSON.parse(favouriteApartments);
		$('.js-favourite-toggle').each(function () {
			var thisapartmentId = $(this).attr('data-apartment-id');
			if (favouriteApartments.includes(thisapartmentId)) {
				$(this).addClass('favourite-toggle--active')
			}
		})
	}

	refreshFavouritesCount();
}


function refreshFavouritesCount() {
	var favouriteApartments = Cookies.get('favouriteApartments');
	if (typeof (favouriteApartments) !== 'undefined') {
		favouriteApartments = JSON.parse(favouriteApartments);
		if (favouriteApartments.length > 0) {
			$('.sh-button__counter').html(favouriteApartments.length);
			$('.sh-button__counter').removeClass('sh-button__counter--hidden')
		} else {
			$('.sh-button__counter').addClass('sh-button__counter--hidden')
		}
	}
	else {
		$('.sh-button__counter').addClass('sh-button__counter--hidden')
	}
}


$(function () {
	const getScrollbarWidth = function () {
		var cssSBWidthVariableName = '--js-scrollbar-width';
		var css1vwInPxWidthVariableName = '--js-real-vw';

		const prevWidth = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue(cssSBWidthVariableName);
		const newWidth = `${window.innerWidth - document.body.clientWidth}px`;

		if (newWidth !== prevWidth) {
			document.documentElement.style.setProperty(cssSBWidthVariableName, newWidth);
		}

		const prevVwWidth = window
			.getComputedStyle(document.documentElement)
			.getPropertyValue(css1vwInPxWidthVariableName);
		const newVwWidth = `${document.body.clientWidth / 100}px`;

		if (newVwWidth !== prevVwWidth) {
			document.documentElement.style.setProperty(css1vwInPxWidthVariableName, newVwWidth);
		}




	};

	const setScrollbarWidth = () => {
		window.addEventListener('load', getScrollbarWidth);
		window.addEventListener('resize', getScrollbarWidth);
		getScrollbarWidth();
	};
	setScrollbarWidth();


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


	$('.js-pw-cards-slider').each(function () {

		var swiper = new Swiper($(this)[0], {
			pagination: false,
			navigation: false,
			effect: "fade",

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

			/*autoplay: {
				delay: 5000,
			},*/
		});
	});




	$('.js-cards-slider').each(function () {

		var swiper = new Swiper($(this)[0], {
			slidesPerView: 1,
			spaceBetween: 10,
			autoHeight: true,
			breakpoints: {
				// when window width is >= 320px
				641: {
					autoHeight: false,
					slidesPerView: 2,
					spaceBetween: 22
				},

				961: {
					autoHeight: false,
					slidesPerView: 2,
					spaceBetween: 32
				},

				1201: {
					autoHeight: false,
					slidesPerView: 3,
					spaceBetween: 32
				}
			},
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

			/*autoplay: {
				delay: 5000,
			},*/
		});
	});

	$('.js-benefits-cards-slider').each(function () {

		var swiper = new Swiper($(this)[0], {
			slidesPerView: 'auto',
			spaceBetween: 10,
			autoHeight: false,
			breakpoints: {
				// when window width is >= 320px
				641: {
					autoHeight: false,
					slidesPerView: 'auto',
					spaceBetween: 22
				},

				961: {
					autoHeight: false,
					slidesPerView: 'auto',
					spaceBetween: 32
				},

				1201: {
					autoHeight: false,
					//slidesPerView: 3.117,
					slidesPerView: 'auto',
					spaceBetween: 32
				}
			},
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

			/*autoplay: {
				delay: 5000,
			},*/
		});
	});

	$('.js-building-progress-cards-slider').each(function () {

		var sliderSection = $(this).closest('section');
		var swiper = new Swiper($(this)[0], {
			slidesPerView: 1,
			spaceBetween: 16,
			autoHeight: false,
			breakpoints: {
				// when window width is >= 320px
				481: {
					autoHeight: false,
					slidesPerView: 1,
					spaceBetween: 16
				},
				641: {
					autoHeight: false,
					slidesPerView: 'auto',
					spaceBetween: 22
				},

				961: {
					autoHeight: false,
					slidesPerView: 'auto',
					spaceBetween: 32
				},

				1201: {
					autoHeight: false,
					//slidesPerView: 3.117,
					slidesPerView: 'auto',
					spaceBetween: 32
				}
			},
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

			/*autoplay: {
				delay: 5000,
			},*/
		});


		$(sliderSection).on('click', '.js-building-progress-slider-filter', function () {
			$(this).addClass('tabs-controls__item--active').siblings('.tabs-controls__item').removeClass('tabs-controls__item--active')
			var typeId = $(this).attr('data-type-id');
			var slides = sliderSection.find('.swiper-slide');
			slides.filter(':not([data-type-id="' + typeId + '"])').addClass('swiper-slide--disabled');
			slides.filter('[data-type-id="' + typeId + '"]').removeClass('swiper-slide--disabled');
			swiper.update();
			swiper.updateSize();
		});
		$(sliderSection).find('.js-building-progress-slider-filter:first').trigger('click');
	});





	$('.js-newssec-tabs-section').each(function () {
		var section = $(this);

		$(section).on('click', '.js-newssec-tabs-control', function () {
			$(this).addClass('tabs-controls__item--active').siblings('.tabs-controls__item').removeClass('tabs-controls__item--active')
			var typeId = $(this).attr('data-type');
			var cards = section.find('.js-newssec-card');
			cards.filter(':not([data-type="' + typeId + '"])').addClass('d-n-i');
			cards.filter('[data-type="' + typeId + '"]').removeClass('d-n-i');
		});
		$(section).find('.js-newssec-tabs-control:first').trigger('click');
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
				//конвертируем из форматированного вывода в нормальное число
				if (typeof (slider.options.format) !== 'undefined') {
					this.value = slider.options.format.from(this.value);
				}
				//ограничим минимум минимумом слайдера, ибо есть баг с установкой меньше min
				this.value = Math.max(slider.options.range.min, this.value);

				slider.set([this.value], true, true);
			});

		} else {
			rs_inp_l[0].addEventListener('change', function () {
				//конвертируем из форматированного вывода в нормальное число
				if (typeof (slider.options.format) !== 'undefined') {
					this.value = slider.options.format.from(this.value);
				}
				//ограничим минимум минимумом слайдера, ибо есть баг с установкой меньше min
				this.value = Math.max(slider.options.range.min, this.value);

				slider.set([this.value, null], true, true);
			});
			rs_inp_r[0].addEventListener('change', function () {
				//конвертируем из форматированного вывода в нормальное число
				if (typeof (slider.options.format) !== 'undefined') {
					this.value = slider.options.format.from(this.value);
				}
				//ограничим минимум минимумом слайдера, ибо есть баг с установкой меньше min
				this.value = Math.max(slider.options.range.min, this.value);

				slider.set([null, this.value], true, true);
			});

			$(rs_inp_l[0]).on('changeBoth', function () {
				if (typeof (slider.options.format) !== 'undefined') {
					rs_inp_l[0].value = slider.options.format.from(rs_inp_l[0].value);
				}
				rs_inp_l[0].value = Math.max(slider.options.range.min, rs_inp_l[0].value);
				if (typeof (slider.options.format) !== 'undefined') {
					rs_inp_r[0].value = slider.options.format.from(rs_inp_r[0].value);
				}
				rs_inp_r[0].value = Math.max(slider.options.range.min, rs_inp_r[0].value);



				slider.set([rs_inp_l[0].value, rs_inp_r[0].value], true, true);
			});
			$(rs_inp_r[0]).on('changeBoth', function () {
				if (typeof (slider.options.format) !== 'undefined') {
					rs_inp_l[0].value = slider.options.format.from(rs_inp_l[0].value);
				}
				rs_inp_l[0].value = Math.max(slider.options.range.min, rs_inp_l[0].value);
				if (typeof (slider.options.format) !== 'undefined') {
					rs_inp_r[0].value = slider.options.format.from(rs_inp_r[0].value);
				}
				rs_inp_r[0].value = Math.max(slider.options.range.min, rs_inp_r[0].value);

				slider.set([rs_inp_l[0].value, rs_inp_r[0].value], true, true);
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
			var $state = $("<span>" + $(state.element).html() + "</span>");
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

	window.isdef = function (variable) {
		return typeof variable !== 'undefined';
	};



	$('body').on('click', '.js-call-me-modal,a[href="#js-call-me-modal"]', function (e) {
		e.preventDefault();
		e.stopPropagation();

		var modal = $('#call-me-modal');
		var btn = $(this);
		var title = 'Заказать обратный звонок';
		var dataTitle = btn.attr('data-title');
		if (isdef(dataTitle) && dataTitle.length > 0) {
			title = dataTitle;
		}
		if (isdef(dataTitle) && dataTitle === 'btn') {
			title = btn.text();
		}
		window.prevModalTitle = title;
		var subject = title;
		var dataSubject = btn.attr('data-subject');
		if (isdef(dataSubject) && dataSubject.length > 0) {
			subject = dataSubject;
		}

		modal.attr('data-custom-title', title);
		modal.find('.simple-modal__title').html(title);

		modal.find('.js-webform-field-subject').val(subject);
		modal.find('.js-webform-field-source').val(document.location.href);

		Fancybox.show([{ src: "#call-me-modal", type: "inline", closeButton: false }]);
	});

	$('body').on('click', '.js-answer-modal,a[href="#js-answer-modal"]', function (e) {
		e.preventDefault();
		e.stopPropagation();

		var modal = $('#answer-modal');
		var btn = $(this);
		var title = 'Задать вопрос';
		var dataTitle = btn.attr('data-title');
		if (isdef(dataTitle) && dataTitle.length > 0) {
			title = dataTitle;
		}
		if (isdef(dataTitle) && dataTitle === 'btn') {
			title = btn.text();
		}
		window.prevModalTitle = title;
		var subject = title;
		var dataSubject = btn.attr('data-subject');
		if (isdef(dataSubject) && dataSubject.length > 0) {
			subject = dataSubject;
		}

		modal.attr('data-custom-title', title);
		modal.find('.simple-modal__title').html(title);

		modal.find('.js-webform-field-subject').val(subject);
		modal.find('.js-webform-field-source').val(document.location.href);

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
		var phoneIm = new Inputmask("+7 (999) 999-99-99", { clearIncomplete: true });
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

				var minRate = Number.MAX_SAFE_INTEGER;
				var minPayment = Number.MAX_SAFE_INTEGER;
				var banks_count = 0;

				banks.each(function () {
					var bank = $(this),
						id = parseInt(bank.attr('data-id'));
					if (banksIdsForThisProgram.includes(id)) {
						var bankRate = parseFloat(program.banks[id]);
						var bankPayment = eval(program.formula);

						minRate = Math.min(minRate, bankRate);
						minPayment = Math.min(minPayment, bankPayment);
						++banks_count;

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

				section.find('.js-pw-variants-count').html(banks_count + ' ' + num_word(banks_count, ['вариант', 'варианта', 'вариантов']));
				section.find('.js-pw-variants-count-simple').html(banks_count);
				section.find('.js-pw-from-coeff').html("от " + bankRateFormat.to(minRate));
				section.find('.js-pw-from-min').html("от " + bankPaymentFormat.to(minPayment) + " ₽/мес.");

				/*
							.js-pw-variants-count 4 варианта
							.js-pw-variants-count-simple 16
							.js-pw-from-coeff от 5.7%
							.js-pw-from-min  от 54 679 ₽/мес.
				*/

			}
			else {
				$(this).closest('section').remove();
				console.log('error  информация о программе отсутствует');
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


	$('.js-simplebar').each(function () {
		var simpleBar = new SimpleBar($(this)[0], {
			autoHide: false
		});

	});


	$(window).on("resize", function () {
		if (window.matchMedia('(min-width:961px)').matches) {
			$('.js-banks-simplebar:not([data-simplebar="init"]').each(function () {
				var simpleBar = new SimpleBar($(this)[0], {
					autoHide: false
				});
			});
		}
	});



	if ($('.js-favourite-toggle').length > 0) {
		refreshFavourites();

	}

	$('body').on('click', '.js-favourite-toggle', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var thisapartmentId = $(this).attr('data-apartment-id');
		var current = Cookies.get('favouriteApartments');

		if (typeof (current) !== 'undefined' && current !== "") {
			current = JSON.parse(current);

			indexInArray = current.indexOf(thisapartmentId);
			if (indexInArray > -1) {
				current.splice(indexInArray, 1);
				$(this).removeClass('favourite-toggle--active');
				if ($(this).closest('#favourites').length > 0) {
					$(this).closest('.apartment-card').remove();
				}
			}
			else {
				current.push(thisapartmentId);
				$(this).addClass('favourite-toggle--active');
				/*current.filter(function(value, index, array) {
					return array.indexOf(value) === index;
				});*/
			}
			Cookies.set('favouriteApartments', JSON.stringify(current), { expires: 365 });
		}
		else {
			Cookies.set('favouriteApartments', JSON.stringify([thisapartmentId]), { expires: 365 });
			$(this).addClass('favourite-toggle--active');
		}

		refreshFavouritesCount();

	});


	refreshFavouritesCount();



	$('.js-togglable-pictures').each(function () {
		var picGroup = $(this);
		picGroup.on('click', '.js-togglable-pictures-toggle:not(.tabs-controls__item--active)', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var toggle = $(this);

			picGroup.find('.js-togglable-pictures-img').eq(toggle.index()).addClass('togglable-pictures__img--active')
				.siblings('.togglable-pictures__img--active').removeClass('togglable-pictures__img--active');

			toggle.addClass('tabs-controls__item--active')
				.siblings('.tabs-controls__item--active').removeClass('tabs-controls__item--active');
		});
	});

	$('.js-simple-tabs').each(function () {
		var picGroup = $(this);
		picGroup.on('click', '.js-simple-tabs-controller:not(.tabs-controls__item--active)', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var toggle = $(this);

			picGroup.find('.js-simple-tabs-content-item').eq(toggle.index()).addClass('simple-tabs-content-item--active')
				.siblings('.simple-tabs-content-item--active').removeClass('simple-tabs-content-item--active');

			toggle.addClass('tabs-controls__item--active')
				.siblings('.tabs-controls__item--active').removeClass('tabs-controls__item--active');
		});
	});


	window.genplanOnAdaptive = window.matchMedia('(max-width:960px)').matches;
	$(window).on("resize", function () {
		window.genplanOnAdaptive = window.matchMedia('(max-width:960px)').matches;
	});

	if ($('.js-genplan-icon').length > 0) {

		$('.js-genplan-icon').each(function () {
			$(this).on('mouseover mouseenter', function () {
				if (!window.genplanOnAdaptive) {
					$(this).addClass('genplan-icon--active').siblings('.genplan-icon--active').removeClass('genplan-icon--active');
				}
			});
			$(this).on('click', function () {
				if (window.genplanOnAdaptive) {
					var id = $(this).attr('data-id');
					$(this).addClass('genplan-icon--active').siblings('.genplan-icon--active').removeClass('genplan-icon--active');
					$(this).closest('section').find('.js-genplan-info-mob[data-id="' + id + '"]').addClass('genplan-info--mob-active').siblings('.genplan-info--mob-active').removeClass('genplan-info--mob-active');
				}
			});
		});
		$('.js-genplan-block__pic').on('mouseover mouseenter click', function () {
			$(this).closest('.genplan-wrap').find($('.js-genplan-icon')).removeClass('genplan-icon--active');
		});

		$('.js-genplan-infos-wrap-mob').each(function () {
			var mobWrap = $(this);
			$(this).siblings('.genplan-wrap-inner').find('.genplan-info').each(function () {
				$(this).clone().attr('style', '').addClass('js-genplan-info-mob genplan-info--mob').appendTo(mobWrap);

			});
		});
		$('.js-genplan-infos-wrap-mob').on('click', '.js-genplan-info__mob-close', function () {
			$(this).closest('section').find('.genplan-icon--active').removeClass('genplan-icon--active');
			$(this).closest('section').find('.js-genplan-info-mob.genplan-info--mob-active').removeClass('genplan-info--mob-active');
		});
		$('.js-scrollable-with-info-mob--genplan').each(function () {
			$(this).on('scroll', function () {
				var section = $(this).closest('section');
				section.find('.genplan-icon--active').removeClass('genplan-icon--active');
				section.find('.js-genplan-info-mob.genplan-info--mob-active').removeClass('genplan-info--mob-active');
			});
		});

	}

	$('.js-scrollable-with-info-mob').each(function () {
		var isOnceShown = false;
		var $this = $(this);
		var infoBlock = $this.find('.js-mob-scrollable-info');

		if ($this.isXScrollable()) {
			infoBlock.addClass('mob-scrollable-info--shown');
			isOnceShown = true;
			$this.one('scroll click', function () {
				infoBlock.removeClass('mob-scrollable-info--shown');
			});
		}

		$(window).on("resize", function () {
			if (!isOnceShown && $this.isXScrollable()) {
				infoBlock.addClass('mob-scrollable-info--shown');
				isOnceShown = true;
				$this.one('scroll click', function () {
					infoBlock.removeClass('mob-scrollable-info--shown');
				});
			}
		});
	});



	$('.js-aplans-info-slider').each(function () {
		var sliderSection = $(this).closest('section');
		var swiper = new Swiper($(this)[0], {
			slidesPerView: 1,
			spaceBetween: 10,
			//autoHeight: true,
			effect: "fade",
			allowTouchMove: true,
			breakpoints: {
				961: {
					effect: "fade",
					allowTouchMove: false
					//autoHeight: true,
				}
			},
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
			keyboard: {
				enabled: false
			},
			mousewheel: {
				enabled: false
			},

			/*autoplay: {
				delay: 5000,
			},*/
		});



		$(sliderSection).find('.js-aplans-thumb-inp').on('change', function () {
			var infoId = $(this).attr('data-info-id');

			swiper.slides.filter(function (el) { return !(el.classList.contains('aplans-info-slider-slide--disabled')); }).forEach((slide, index) => {
				console.log($(slide).attr('data-info-id'));
				if ($(slide).attr('data-info-id') === infoId) {
					swiper.slideTo(index);

					return;
				}
			});
		});

		$(sliderSection).on('click', '.js-apartment-plans-group-toggle', function () {
			$(this).addClass('tabs-controls__item--active').siblings('.tabs-controls__item').removeClass('tabs-controls__item--active')
			var typeId = $(this).attr('data-type-id');
			var thumbs = $(this).closest('section').find('.apartment-plans-thumb');
			thumbs.filter('.apartment-plans-thumb--active').removeClass('apartment-plans-thumb--active');
			thumbs.filter('[data-type-id="' + typeId + '"]').addClass('apartment-plans-thumb--active');


			var slides = $(this).closest('section').find('.aplans-info-slider-slide');
			slides.filter(':not([data-type-id="' + typeId + '"])').addClass('aplans-info-slider-slide--disabled')/*.css('display','none')*/;
			slides.filter('[data-type-id="' + typeId + '"]').removeClass('aplans-info-slider-slide--disabled')/*.css('display','block')*/;

			swiper.update();
			swiper.updateSize();

			thumbs.filter('.apartment-plans-thumb--active').first().find('.js-aplans-thumb-inp').prop('checked', true).trigger('change');
			//.updateAutoHeight(speed)
			//$(this).closest('section').find('.partment-plans-thumb--active').removeClass('partment-plans-thumb--active');

			//.apartment-plans-thumb.apartment-plans-thumb--active

		});
		$(sliderSection).find('.js-apartment-plans-group-toggle:first').trigger('click');


		/*.js-aplans-thumb-inp
		data-info-id*/



	});




	$('.js-impobj-slider').each(function () {

		var sliderSection = $(this).closest('section');
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

		$(sliderSection).find('.js-impobj-control').on('click', function () {
			var target = $(this).attr('data-target');
			swiper.slides.forEach((slide, index) => {
				if (slide.getAttribute('data-target') === target) {
					swiper.slideTo(index);
					if(window.matchMedia('(max-width: 960px)').matches){
						$('html, body').stop().animate({
							scrollTop:  $('.important-objects-section').offset().top-$('.site-header').outerHeight() - 20
						}, 300);

					}
					return;
				}
			});
		});
	});





});