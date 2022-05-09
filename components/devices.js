import { Button } from '@wordpress/components';
const Devices = ({ title, device, renderFunction }) => {
	return (
		<div className="res__devices">
			<div className="res__label">{title}</div>
			<div className="res__btns">
				<Button
					onClick={() => renderFunction('desktop')}
					isSmall={true}
					isPressed={device === 'desktop'}
				>
					<span className="dashicons dashicons-desktop"></span>
				</Button>
				<Button
					onClick={() => renderFunction('tablet')}
					isSmall={true}
					isPressed={device === 'tablet'}
				>
					<span className="dashicons dashicons-tablet"></span>
				</Button>
				<Button
					onClick={() => renderFunction('smartphone')}
					isSmall={true}
					isPressed={device === 'smartphone'}
				>
					<span className="dashicons dashicons-smartphone"></span>
				</Button>
			</div>
		</div>
	);
};
export default Devices;
