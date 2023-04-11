import { FC } from 'react';
import { Message } from '../../constants/types';
import Stars from '../Stars/Stars.component';

interface IFileMapper {
	src?: string;
	type?: string;
}

const FileMapper: FC<IFileMapper> = ({ src, type }) => {
	if (!src || !type) return null;
	if (type.startsWith('audio')) return <audio src={src} controls />;
	if (type.startsWith('video')) return <video src={src} controls />;
	if (type.startsWith('image')) return <img src={src} alt='' />;
	return null;
};

interface IMessage {
	message: Message;
	showEdit: string;
	setShowEdit: (id: string) => void;
	onEditSubmit: (e: React.FormEvent<HTMLFormElement>, message: Message) => void;
	onRate: (message: Message, rating: number) => void;
	last?: boolean;
}

const MessageComponent: FC<IMessage> = ({
	message,
	showEdit,
	setShowEdit,
	onEditSubmit,
	onRate,
	last = false,
}) => {
	return (
		<div>
			<div className={`chat-module__message ${message.username === 'bot' ? 'bot' : 'human'}`}>
				<div className='chat-module__message-avatar'>
					{message.username === 'bot' ? (
						<img src='/assets/images/logo2.jpg' alt='' />
					) : (
						<img src='/assets/images/user-default.png' alt='' />
					)}
				</div>
				<div className='chat-module__message-content'>
					{message.type === 'text' ? (
						message.message
					) : (
						<FileMapper src={message.file?.url} type={message.file?.type} />
					)}
				</div>
			</div>
			<div style={{ marginLeft: '3.3rem', marginTop: '0.5rem' }}>
				{message.username === 'bot' && process.env.REACT_APP_CHAT_MODE === 'INTERNAL' && (
					<div className='chat-module__message-edit'>
						<Stars
							count={5}
							value={message.rating ? message.rating : 0}
							onChange={(count) => onRate(message, count)}
						/>
						{showEdit !== message.dialogue_id && last && (
							<button
								className='chat-module__message-edit-btn'
								style={{
									alignSelf: 'center',
								}}
								onClick={() => setShowEdit(message.dialogue_id)}
							>
								Edit
							</button>
						)}
					</div>
				)}
				{showEdit === message.dialogue_id && (
					<form
						className='chat-module__message-edit-form'
						onSubmit={(e) => onEditSubmit(e, message)}
					>
						<input
							className='chat-module__form-input'
							type='text'
							name='edit'
							placeholder='Suggestion. Leave blank to cancel'
						/>
						{/* <button className='chat-module__message-edit-btn' type='submit'>
							Submit
						</button> */}
					</form>
				)}
			</div>
		</div>
	);
};

export default MessageComponent;
