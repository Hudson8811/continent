

$(function () {


	initMap();

	async function initMap() {
		// Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
		await ymaps3.ready;

		const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer} = ymaps3;

		$('.js-init-contacts-map').each(function(){
			var mapEl=$(this);
			var mapCenter=[37.588144, 55.733842];
			var mapCenterTemp=$(this).attr('data-coordinates');

			if(typeof(mapCenterTemp)!=='undefined'){
				mapCenterTemp=mapCenterTemp.split(', ');
				if(typeof(mapCenterTemp)!=='undefined' && mapCenterTemp.length===2){
					mapCenter=mapCenterTemp;
				}
			}






			const map = new YMap(mapEl[0], {
				location: {
					center: mapCenter,
					zoom: 5
				},
				mode: 'vector'
			});

			map.addChild(new YMapDefaultSchemeLayer({
				customization: greyMapStyle
			}));
			 // Add a layer of geo objects to display the markers
   			map.addChild(new YMapDefaultFeaturesLayer())



			$('.js-coordinates').each(function(){
				var coord=false;
				var coordTemp=$(this).attr('data-coordinates');
				var coorElem=$(this);

				if(typeof(coordTemp)!=='undefined'){
					coordTemp=coordTemp.replaceAll(' ','').split(',');
					if(typeof(coordTemp)!=='undefined' && coordTemp.length===2){
						coord=coordTemp;
					}
				}
				if(coord!==false){
					var image_src=coorElem.attr('data-icon');
					image_src=image_src!== undefined?image_src:'';

					const markerElement = document.createElement('div');
					markerElement.className = 'contacts-map-marker';
					const markerElementImg = document.createElement('img');
					markerElementImg.src = image_src;
					markerElement.appendChild(markerElementImg);

					//markerElement.onclick = () => alert(markerProp.message);
					map.addChild(new YMapMarker({coordinates: coord}, markerElement));

					coorElem.on('click',function(e){
						e.preventDefault();
						e.stopPropagation();

						map.update({location: {
							center: coord,
							zoom: 13
						}});
						$('html,body').animate({
							scrollTop: mapEl.offset().top - ( $(window).height() - mapEl.outerHeight(true) ) / 2
						}, 200);
					});
				}
			});
		});
	}
});


