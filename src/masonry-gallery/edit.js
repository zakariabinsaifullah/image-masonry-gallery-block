/* eslint-disable no-unused-vars */
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

const { Fragment } = wp.element;
const { __ } = wp.i18n;

// editor style
import './editor.scss';

// component
import Devices from '../../components/devices';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		galleryId,
		images,
		colDevice,
		deskCol,
		tabCol,
		phoneCol,
		gapDevice,
		deskGap,
		tabGap,
		phoneGap,
		enableLightbox,
		imageHoverEffect,
	} = attributes;
	// cols number
	const colsNumber = images ? deskCol : 1;

	// gallery id
	setAttributes({ galleryId: clientId.slice(0, 8) });

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={__('Gallery Settings', 'masonry-image-gallery')}
					initialOpen={true}
				>
					<Devices
						device={colDevice}
						title={__('Number of Columns', 'masonry-image-gallery')}
						renderFunction={(device) =>
							setAttributes({
								colDevice: device,
							})
						}
					/>
					{colDevice === 'desktop' && (
						<RangeControl
							value={deskCol}
							onChange={(value) =>
								setAttributes({ deskCol: value })
							}
							min={1}
							max={5}
						/>
					)}

					{colDevice === 'tablet' && (
						<RangeControl
							value={tabCol}
							onChange={(value) =>
								setAttributes({ tabCol: value })
							}
							min={1}
							max={5}
						/>
					)}

					{colDevice === 'smartphone' && (
						<RangeControl
							value={phoneCol}
							onChange={(value) =>
								setAttributes({ phoneCol: value })
							}
							min={1}
							max={5}
						/>
					)}
					{/* Columns Gap */}
					<Devices
						device={gapDevice}
						title={__('Items Gutter', 'masonry-image-gallery')}
						renderFunction={(device) =>
							setAttributes({
								gapDevice: device,
							})
						}
					/>
					{gapDevice === 'desktop' && (
						<RangeControl
							value={deskGap}
							onChange={(value) =>
								setAttributes({ deskGap: value })
							}
							min={0}
							max={100}
							help={__(
								'unit in pixel (px)',
								'masonry-image-gallery'
							)}
						/>
					)}

					{gapDevice === 'tablet' && (
						<RangeControl
							value={tabGap}
							onChange={(value) =>
								setAttributes({ tabGap: value })
							}
							min={0}
							max={100}
							help={__(
								'unit in pixel (px)',
								'masonry-image-gallery'
							)}
						/>
					)}

					{gapDevice === 'smartphone' && (
						<RangeControl
							value={phoneGap}
							onChange={(value) =>
								setAttributes({ phoneGap: value })
							}
							min={0}
							max={100}
							help={__(
								'unit in pixel (px)',
								'masonry-image-gallery'
							)}
						/>
					)}
				</PanelBody>
				<PanelBody
					title={__(
						'Gallery Image Settings',
						'masonry-image-gallery'
					)}
					initialOpen={false}
				>
					<ToggleControl
						label={__('Enable Lightbox')}
						checked={enableLightbox}
						onChange={() =>
							setAttributes({ enableLightbox: !enableLightbox })
						}
					/>
					<SelectControl
						label={__(
							'Image Hover Effect',
							'masonry-image-gallery'
						)}
						value={imageHoverEffect}
						options={[
							{
								label: __('None', 'masonry-image-gallery'),
								value: 'none',
							},
							{
								label: __('Zoom In', 'masonry-image-gallery'),
								value: 'zoom__in',
							},
							{
								label: __('Zoom Out', 'masonry-image-gallery'),
								value: 'zoom__out',
							},
							{
								label: __('GrayScale', 'masonry-image-gallery'),
								value: 'gray__scale',
							},
						]}
						onChange={(effect) => {
							setAttributes({ imageHoverEffect: effect });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			{images && (
				<BlockControls>
					<ToolbarGroup>
						<MediaUploadCheck>
							<MediaUpload
								multiple={true}
								onSelect={(media) =>
									setAttributes({
										images: media,
									})
								}
								gallery={true}
								allowedTypes={['image']}
								value={images.map((image) => image.id)}
								render={({ open }) => {
									return (
										<ToolbarButton
											label={__(
												'Edit Images',
												'masonry-image-gallery'
											)}
											onClick={open}
											icon="edit"
										/>
									);
								}}
							/>
						</MediaUploadCheck>
					</ToolbarGroup>
				</BlockControls>
			)}
			<div
				{...useBlockProps({
					className: `dc__${colsNumber} tc__${tabCol} pc__${phoneCol} dg__${deskGap} tg__${tabGap} pg__${phoneGap}`,
				})}
			>
				{images ? (
					images.map((image) => {
						return (
							<div
								key={image.id}
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
									className={`wp-image${image.id}`}
								/>
							</div>
						);
					})
				) : (
					<MediaPlaceholder
						multiple={true}
						onSelect={(media) =>
							setAttributes({
								images: media,
							})
						}
						onFilesPreUpload={(media) =>
							setAttributes({
								images: media,
							})
						}
						onSelectURL={false}
						allowedTypes={['image']}
						labels={{
							title: __(
								'Add Gallery Images',
								'masonry-image-gallery'
							),
						}}
					/>
				)}
			</div>
		</Fragment>
	);
}
