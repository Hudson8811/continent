
function generateFloorApartmentPopup(parentBlock, roomInfo, positionCss) {
	parentBlock.append(
		'<div class="floors-popup js-floors-popup" style="' + positionCss + '" data-external-id="' + roomInfo.externalId + '">' +
		'	<a class="apartment-card apartment-card--w100" href="' + roomInfo.link + '">' +
		'		<div class="apartment-card__text">' +
		'			<div class="apartment-card__price apartment-card__price--mt0">' +
		'			<div class="apartment-card__new-price">' + roomInfo.price + '</div>' +
		'			</div>' +
		'			<div class="apartment-card__price-per-m">' + roomInfo.pricePerM + '</div>' +
		'			<div class="apartment-card__props apartment-inline-props">' +
		'			<div class="apartment-inline-prop">' + roomInfo.props.join('</div><div class="apartment-inline-prop">') + '</div>' +
		'			</div>' +
		'		</div>' +
		'		<div class="apartment-card__favourite-toggle favourite-toggle js-favourite-toggle" data-apartment-id="' + roomInfo.externalId + '">' +
		'			<svg>' +
		'			<use xlink:href="img/sprites/sprite.svg#heart"></use>' +
		'			</svg>' +
		'		</div>' +
		'		<div class="apartment-card__picture"><img src="' + roomInfo.image + '" loading="lazy" alt=""></div>' +
		'	</a>' +
		'</div>'
	);
}



function processRoom(pathEl, parentBlock, complexId, buildingId, entrance, floor, room, roomInfo) {
	var corrections = window.lockedApartmentsFix[complexId + '_' + buildingId + '_' + entrance + '_' + floor + '_' + room];

	var posCorrection = {
		left: 0,
		top: 0
	};
	var offsetPB = parentBlock.offset();
	var offsetEl = pathEl.offset();
	var pathElBR = pathEl[0].getBoundingClientRect();

	if (typeof (corrections) !== 'undefined') {
		posCorrection = {
			left: pathElBR.width / 100 * corrections.left,
			top: pathElBR.height / 100 * corrections.top
		}
	}

	var infoPosLeft = (offsetEl.left - offsetPB.left + pathElBR.width * 0.5 + posCorrection.left) / parentBlock.width() * 100;
	var infoPosTop = (offsetEl.top - offsetPB.top + pathElBR.height * 0.5 + posCorrection.top) / parentBlock.height() * 100;


	pathEl.attr('data-external-id', roomInfo.externalId);
	pathEl.attr('data-link', roomInfo.link);

	var positionCss = 'left: ' + infoPosLeft + '%; top: ' + infoPosTop + '%;';
	if (roomInfo.locked === true) {
		pathEl.addClass('floor-svg-locked');
		parentBlock.append('<div class="single-locked-icon" style="' + positionCss + '" data-id="' + room + '"></div>');
	}

	if (!window.isMax960) {
		generateFloorApartmentPopup(parentBlock, roomInfo, positionCss);
	}



}

function refreshEntranceIcons(complexId, buildingId, entrance) {
	var entranceInfo = window.entranceInfo[complexId + '_' + buildingId + '_' + entrance];
	if (typeof (entranceInfo) === 'undefined' && typeof (entranceInfo.icons) === 'undefined') {
		console.log('err entranceInfo 100');
		return;
	}

	if (entranceInfo.icons.length > 0) {
		$('.js-floors-icons').html('<div class="floors-icon"><img src="' + entranceInfo.icons.join('" alt=""></div><div class="floors-icon"><img src="') + '" alt=""></div>');
	}
	else {
		$('.js-floors-icons').html('');
	}
}
function initSingleFloor(parentBlock) {
	//var parentBlock = $(this);//.js-single-floor
	if (parentBlock.hasClass('single-floor--locked')) {
		return;
	}

	var complexId = parentBlock.attr('data-complex-id'),
		buildingId = parentBlock.attr('data-building-id'),
		entrance = parentBlock.attr('data-entrance'),
		floor = parentBlock.attr('data-floor');

	var floorApratmentsInfo = window.apartmentsInfo[complexId + '_' + buildingId + '_' + entrance + '_' + floor];
	if (typeof (floorApratmentsInfo) === 'undefined') {
		console.log('err floorApratmentsInfo  100');
	}

	refreshEntranceIcons(complexId, buildingId, entrance);
	parentBlock.find('.single-floor__pictures svg path[id],.single-floor__pictures svg rect[id]').each(function () {
		var room = $(this).attr('id');
		var roomInfo = floorApratmentsInfo[room];
		processRoom($(this), parentBlock, complexId, buildingId, entrance, floor, room, roomInfo);

	});

	parentBlock.addClass('single-floor--locked')
}


$(function () {
	window.isMax960 = window.matchMedia('(max-width:960px)').matches;


	$('.js-floors-block').on('click', '.js-single-floor .single-floor__pictures path', function () {
		document.location.href = $(this).attr('data-link');
		//window.open($(this).attr('data-link'), '_blank');
	});

	if (!window.isMax960) {
		$('.js-floors-block').on('mouseenter', '.js-single-floor .single-floor__pictures path', function () {
			$(this).closest('svg').find('.floor-svg-apartment-active').removeClass('floor-svg-apartment-active');
			$(this).addClass('floor-svg-apartment-active');
			$('.js-floors-popup[data-external-id="' + $(this).attr('data-external-id') + '"]').addClass('floors-popup--active').siblings('.floors-popup--active').removeClass('floors-popup--active');
		});
		$('.js-floors-block').on('mouseleave', '.floors-maps__item', function () {
			$('.floors-maps__item--active .floors-popup--active').removeClass('floors-popup--active');
			$('.floors-maps__item--active svg  .floor-svg-apartment-active').removeClass('floor-svg-apartment-active');
		});
	}


	initSingleFloor($('.floors-maps__item--active .js-single-floor'));



	$('.js-change-entrance').on('click', function () {
		$(this).addClass('fpagi-controls__item--active').siblings().removeClass('fpagi-controls__item--active');
	});

	function actualizeFloorSwitch(activeElem) {
		var parentEl = activeElem.closest('.fpagi-controls');
		const prevToShow = 3;
		const nextToShow = 4;
		var elementsToShow = 8;
		var prevCount = activeElem.prevAll().length;
		var nextCount = activeElem.nextAll().length;

		parentEl.find('.js-change-etage').hide();
		activeElem.addClass('fpagi-controls__item--active').siblings().removeClass('fpagi-controls__item--active');
		parentEl.find('.js-change-etage').hide();

		prevModifiedCount = Math.min(prevCount, prevToShow);
		nextModifiedCount = Math.min(nextCount, nextToShow);

		if (prevModifiedCount < 1) {
			activeElem.show();
			activeElem.nextAll().slice(0, 7).show();
		} else {
			if (nextModifiedCount < nextToShow) {
				prevModifiedCount+=nextToShow-nextModifiedCount;
				prevModifiedCount = Math.min(prevCount, prevModifiedCount);
			}
			var prevN = activeElem.prevAll().slice(prevModifiedCount - 1, prevModifiedCount);
			prevN.show();
			prevN.nextAll().slice(0, elementsToShow-1).show();
		}
	}
	actualizeFloorSwitch($('.fpagi-floor-controls--active .js-change-etage[data-id="9"]'));


	$('.js-change-etage').on('click', function () {
		actualizeFloorSwitch($(this));
		//$.extend({}, object1, object2);
	});
	$('.js-prev-etage').on('click', function () {
		var prev=$('.fpagi-floor-controls--active .fpagi-controls__item--active').prev();
		if(prev.length>0){
			actualizeFloorSwitch(prev);
		}
	});
	$('.js-next-etage').on('click', function () {
		var next=$('.fpagi-floor-controls--active .fpagi-controls__item--active').next();
		if(next.length>0){
			actualizeFloorSwitch(next);
		}
	});



	/*
		function lockPath(pathEl, parentBlock, complexId, buildingId, entrance, floor,room) {
			if (parentBlock === false) {
				parentBlock = pathEl.closest('.js-single-floor');
				complexId = parentBlock.attr('data-complex-id');
				buildingId = parentBlock.attr('data-building-id');
				entrance = parentBlock.attr('data-entrance');
				floor = parentBlock.attr('data-floor');
				room = pathEl.attr('id');
			}
			var corrections = window.lockedApartmentsFix[complexId + '_' + buildingId + '_' + entrance + '_' + floor + '_' + room];
			var posCorrection = {
				left: 0,
				top: 0
			};
			var offsetPB = parentBlock.offset();
			var offsetEl = pathEl.offset();
			var pathElBR = pathEl[0].getBoundingClientRect();

			if (typeof (corrections) !== 'undefined') {
				posCorrection = {
					left: pathElBR.width / 100 * corrections.left,
					top: pathElBR.height / 100 * corrections.top
				}
			}

			var left = (offsetEl.left - offsetPB.left + pathElBR.width * 0.5 + posCorrection.left) / parentBlock.width() * 100;
			var top = (offsetEl.top - offsetPB.top + pathElBR.height * 0.5 + posCorrection.top) / parentBlock.height() * 100;

			pathEl.addClass('floor-svg-locked');
			parentBlock.append('<div class="single-locked-icon" style="left: ' + left + '%; top: ' + top + '%; " data-id="' + room + '"></div>');
		}*/

	//lockPath($('.js-single-floor .single-floor__pictures svg [id="3"]'), false);

	/*$('.js-single-floor-test-lock ').each(function () {
		var
			parentBlock = $(this),
			complexId = parentBlock.attr('data-complex-id'),
			buildingId = parentBlock.attr('data-building-id'),
			entrance = parentBlock.attr('data-entrance'),
			floor = parentBlock.attr('data-floor');

		$(this).find('.single-floor__pictures svg path,.single-floor__pictures svg rect').each(function () {
			lockPath($(this), parentBlock, complexId, buildingId, entrance, floor);
		});
	});*/

});