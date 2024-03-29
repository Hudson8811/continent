
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

	if (!window.isMobileMap) {
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

	parentBlock.closest('.floors-maps__item').addClass('floors-maps__item--active').siblings('.floors-maps__item--active').removeClass('floors-maps__item--active');

	var complexId = parentBlock.attr('data-complex-id'),
		buildingId = parentBlock.attr('data-building-id'),
		entrance = parentBlock.attr('data-entrance'),
		floor = parentBlock.attr('data-floor');
	refreshEntranceIcons(complexId, buildingId, entrance);

	if (parentBlock.hasClass('single-floor--init')) {
		return;
	}

	var floorApratmentsInfo = window.apartmentsInfo[complexId + '_' + buildingId + '_' + entrance + '_' + floor];
	if (typeof (floorApratmentsInfo) === 'undefined') {
		console.log('err floorApratmentsInfo  100');
	}

	parentBlock.find('.single-floor__pictures svg path[id],.single-floor__pictures svg rect[id]').each(function () {
		var room = $(this).attr('id');
		var roomInfo = floorApratmentsInfo[room];
		processRoom($(this), parentBlock, complexId, buildingId, entrance, floor, room, roomInfo);
	});

	refreshFavourites();
	parentBlock.addClass('single-floor--init')

}

function actualizeFloor(activeElem) {
	$('.floors-block').addClass('floors-block--hidden');
	setTimeout(() => {
		var parentEl = activeElem.closest('.fpagi-controls');

		var elementsToShow = window.isMobileMap ? 5 : 8;
		var prevToShow = Math.floor((elementsToShow - 1) / 2);
		var nextToShow = elementsToShow - prevToShow;

		var prevCount = activeElem.prevAll().length;
		var nextCount = activeElem.nextAll().length;

		parentEl.find('.js-change-floor').hide();
		activeElem.addClass('fpagi-controls__item--active').siblings().removeClass('fpagi-controls__item--active');
		parentEl.find('.js-change-floor').hide();

		prevModifiedCount = Math.min(prevCount, prevToShow);
		nextModifiedCount = Math.min(nextCount, nextToShow);

		if (prevModifiedCount < 1) {
			activeElem.show();
			activeElem.nextAll().slice(0, 7).show();
		} else {
			if (nextModifiedCount < nextToShow) {
				prevModifiedCount += nextToShow - nextModifiedCount;
				prevModifiedCount = Math.min(prevCount, prevModifiedCount);
			}
			var prevN = activeElem.prevAll().slice(prevModifiedCount - 1, prevModifiedCount);
			prevN.show();
			prevN.nextAll().slice(0, elementsToShow - 1).show();
		}


		var floor = activeElem.attr('data-id');
		var entranceId = $('.js-change-entrance.fpagi-controls__item--active').attr('data-id');

		console.log('entranceId=' + entranceId);
		console.log('floor=' + floor);

		initSingleFloor($('.js-single-floor[data-entrance="' + entranceId + '"][data-floor="' + floor + '"]'));
		setTimeout(() => {
			$('.floors-block').removeClass('floors-block--hidden');
		}, 100);
	}, 300);
}

$(function () {
	window.isMobileMap = window.matchMedia('(max-width:1200px)').matches;

	if ($('.js-floors-block').length > 0) {

		$('.js-floors-block').on('click', '.js-single-floor .single-floor__pictures path', function () {
			document.location.href = $(this).attr('data-link');
			//window.open($(this).attr('data-link'), '_blank');
		});

		if (!window.isMobileMap) {
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


		$('.js-change-entrance').on('click', function () {
			$(this).addClass('fpagi-controls__item--active').siblings().removeClass('fpagi-controls__item--active');
			var id = $(this).attr('data-id');
			var prevEntranceActiveFloor = parseInt($('.fpagi-floor-controls--active .fpagi-controls__item--active').attr('data-id'));

			$('.fpagi-floor-controls[data-entrance="' + id + '"]').addClass('fpagi-floor-controls--active').siblings('.fpagi-floor-controls--active').removeClass('fpagi-floor-controls--active');

			var floorsInEntrance = Array.from($('.fpagi-floor-controls--active .js-change-floor').map(function (id, el) {
				return parseInt($(el).attr('data-id'));
			}))
			//во избежание пустоты массивов
			floorsInEntrance.push(999999);
			floorsInEntrance.push(-999999);

			var closestRight = Math.min(...floorsInEntrance.filter(v => v >= prevEntranceActiveFloor));
			var closestLeft = Math.max(...floorsInEntrance.filter(v => v < prevEntranceActiveFloor));
			var newActiveFloorId = prevEntranceActiveFloor;

			if (Math.abs(floorsInEntrance - closestRight) > Math.abs(floorsInEntrance - closestLeft)) {
				newActiveFloorId = closestLeft;
			}
			else {
				newActiveFloorId = closestRight;
			}
			actualizeFloor($('.fpagi-floor-controls--active .js-change-floor[data-id="' + newActiveFloorId + '"]'));
		});


		actualizeFloor($('.fpagi-floor-controls--active .fpagi-controls__item--active'));



		$('.js-change-floor').on('click', function () {
			actualizeFloor($(this));
			//$.extend({}, object1, object2);
		});
		$('.js-prev-floor').on('click', function () {
			var prev = $('.fpagi-floor-controls--active .fpagi-controls__item--active').prev();
			if (prev.length > 0) {
				actualizeFloor(prev);
			}
		});
		$('.js-next-floor').on('click', function () {
			var next = $('.fpagi-floor-controls--active .fpagi-controls__item--active').next();
			if (next.length > 0) {
				actualizeFloor(next);
			}
		});


	}

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