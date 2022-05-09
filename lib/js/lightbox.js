(function ($) {
	$(document).ready(function () {
		const migbGalleries = $('.wp-block-migb-masonry-gallery');
		[...migbGalleries].forEach((gallery) => {
			const galleryId = $(gallery).data('id');
			$(`#${galleryId}`).magnificPopup({
				delegate: 'a',
				type: 'image',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1],
				},
			});
		});
	});
})(jQuery);
