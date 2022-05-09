/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		galleryId,
		images,
		deskCol,
		tabCol,
		phoneCol,
		deskGap,
		tabGap,
		phoneGap,
		enableLightbox,
		imageHoverEffect,
	} = attributes;
	return (
		<div
			{...useBlockProps.save({
				className: `dc__${deskCol} tc__${tabCol} pc__${phoneCol} dg__${deskGap} tg__${tabGap} pg__${phoneGap}`,
			})}
			data-id={galleryId}
			id={galleryId}
		>
			{images &&
				images.map((image) => {
					return enableLightbox ? (
						<a
							className={`single-gallery-image ${imageHoverEffect} dg__${deskGap} tg__${tabGap} pg__${phoneGap}`}
							href={image.url}
						>
							<img
								src={image.url}
								alt={
									image.alt
										? image.alt
										: __(
												'Gallery Image',
												'masonry-image-gallery'
										  )
								}
								className={`wp-image-${image.id}`}
							/>
						</a>
					) : (
						<div
							className={`single-gallery-image ${imageHoverEffect} dg__${deskGap} tg__${tabGap} pg__${phoneGap}`}
						>
							<img
								src={image.url}
								alt={
									image.alt
										? image.alt
										: __(
												'Gallery Image',
												'masonry-image-gallery'
										  )
								}
								className={`wp-image-${image.id}`}
							/>
						</div>
					);
				})}
		</div>
	);
}
