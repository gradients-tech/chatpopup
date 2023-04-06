import { FC, HTMLAttributes, useState } from 'react';
import { StarIconFilled, StarIconHalf, StarIconOutlined } from '../../assets/star';

interface IStar extends HTMLAttributes<HTMLSpanElement> {
	index: number;
	currentRating: number;
	setCurrentRating: (index: number) => void;
}

const Star: FC<IStar> = ({ index, currentRating, setCurrentRating, ...rest }) => {
	return (
		<span
			style={{
				width: '1.5rem',
				aspectRatio: '1/1',
				cursor: 'pointer',
				position: 'relative',
				color: 'orange',
			}}
			{...rest}
			onMouseMove={(e) => {
				// check if mouse is in the first half of the star
				if (
					e.clientX - e.currentTarget.getBoundingClientRect().left <
					e.currentTarget.getBoundingClientRect().width / 2
				) {
					setCurrentRating(index + 0.5);
				}
				// if not, set the rating to the full star
				else {
					setCurrentRating(index + 1);
				}
			}}
		>
			{currentRating >= index + 1 ? (
				<StarIconFilled />
			) : currentRating >= index + 0.5 ? (
				<StarIconHalf />
			) : (
				<StarIconOutlined />
			)}
		</span>
	);
};

interface IStars {
	count?: number;
	value?: number;
	size?: number;
	onChange?: (count: number) => void;
}

const Stars: FC<IStars> = ({ count = 5, size = 40, onChange, value = -1 }) => {
	const [currentRating, setCurrentRating] = useState(-1);
	const [rating, setRating] = useState(value);

	return (
		<div
			className='chat-module__star-container'
			onMouseLeave={() => setCurrentRating(-1)}
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				height: size,
			}}
			onClick={() => {
				setRating(currentRating);
				onChange && onChange(currentRating);
			}}
		>
			{[...Array(count)].map((_, index) => (
				<Star
					key={index}
					index={index}
					currentRating={currentRating === -1 ? rating : currentRating}
					setCurrentRating={(index) => {
						setCurrentRating(index);
					}}
				/>
			))}
		</div>
	);
};

export default Stars;
