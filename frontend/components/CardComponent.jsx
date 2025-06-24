import React from 'react';
import './cardComponent.css';

function CardComponent({ videos, onSelect }) {
	return (
		<div className='container'>
			{videos.map((video) => {
				return (
					<div
						key={video.id}
						className='video-map'
						onClick={() => onSelect(video.id)}>
						<img
							src='../public/Video-Player-Icon-Transparent-PNG.png'
							className='img'
						/>
						<div>
							<h2>{video.title}</h2>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default CardComponent;
