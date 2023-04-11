import { useEffect, useRef, useState } from 'react';
import { Message } from './constants/types';
import { v4 as uuid } from 'uuid';
import MessageComponent from './components/Message/Message.component';
import { TASK_LIST } from './constants/tasks';
import { ClipIcon, GearIcon, XIcon } from './assets/icon';
import { LANGUAGES, LanguageKey } from './constants/language';
import Dropdown from './components/Dropdown/Dropdown.component';
import Record from './components/Record/Record.component';

const user_id = uuid();

let socket: WebSocket;

function App() {
	const [showChat, setShowChat] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [showEdit, setShowEdit] = useState<string>('');
	const [language, setLanguage] = useState<LanguageKey>('en');
	const [showDropdown, setShowDropdown] = useState(false);
	const messageListRef = useRef<HTMLDivElement>(null);

	const appendMessage = (
		input: string,
		username: string,
		file?: {
			type: string;
			url: string;
		}
	) => {
		const message: Message = {
			id: user_id,
			task: language,
			username: username,
			dialogue_id: Date.now().toString(),
			message: input,
			origin: input,
			edit: null,
			rating: null,
			type: file?.type ? file.type : 'text',
			file: file,
		};
		setMessages((prev) => [...prev, message]);
	};

	const saveMessage = (message: Message) => {
		const data = {
			...message,
			task: language + '-pub',
			edit: message.edit ?? String(message.edit),
			rating: message.rating ?? String(message.rating),
		};
		// socket.send(
		// 	JSON.stringify({
		// 		id: user_id,
		// 		body: data,
		// 		headers: TASK_LIST['online-learning'],
		// 	})
		// );
		console.log({
			id: user_id,
			body: data,
			headers: TASK_LIST['online-learning'],
		});
	};

	const onMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const input = e.currentTarget.message.value.trim();
		if (!input) return;
		appendMessage(input, 'human');

		// enable when WS is ready
		if (Object.hasOwn(LANGUAGES, language)) {
			console.log({
				id: user_id,
				headers: TASK_LIST[language === 'en' ? 'msd-eng' : 'msd-vi'],
				body: {
					data: input,
					client: 'public',
				},
			});
			// 	socket.send(
			// 		JSON.stringify({
			// 			id: user_id,
			// 			headers: TASK_LIST[language === 'en' ? 'msd-eng' : 'msd-vi'],
			// 			body: {
			// 				data: input,
			// 				client: 'public',
			// 			},
			// 		})
			// 	);
		} else {
			const data = [...messages, [input, 'user']];
			console.log({
				id: user_id,
				headers: TASK_LIST['task-oriented'],
				body: data,
			});
			// 	socket.send(
			// 		JSON.stringify({
			// 			id: user_id,
			// 			headers: TASK_LIST['task-oriented'],
			// 			body: data,
			// 		})
			// 	);
		}
		setTimeout(() => {
			appendMessage('Hello', 'bot');
		});
		e.currentTarget.reset();
	};

	// Handle edit submit
	const onEditSubmit = (e: React.FormEvent<HTMLFormElement>, message: Message) => {
		e.preventDefault();
		const input = e.currentTarget.edit.value.trim();
		if (!input) {
			setShowEdit('');
			return;
		}
		message.message = input;
		message.edit = input;
		// Update the message list
		setMessages((prev) => prev.map((m) => (m.dialogue_id === message.dialogue_id ? message : m)));
		saveMessage(message);
		setShowEdit('');
	};

	// Handle rate
	const onRate = (message: Message, rating: number) => {
		message.rating = rating;
		// Update the message list
		setMessages((prev) => prev.map((m) => (m.dialogue_id === message.dialogue_id ? message : m)));
		saveMessage(message);
	};

	const onRecord = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			appendMessage('', 'human', {
				type: file.type,
				url: reader.result as string,
			});
			// TODO
			// Send file to server

			setTimeout(() => {
				appendMessage('Hello', 'bot');
			});
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		// Save the latest message
		if (messages.length) {
			saveMessage(messages[messages.length - 1]);
		}
		// Scroll to bottom
		messageListRef.current?.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: messageListRef.current.scrollHeight,
		});
		// Ignore missing 'message' by eslint, we do not want to re-run this when messages changes, only when the length changes.
		// Other updates to the messages list itself already calls saveMessage()
		// eslint-disable-next-line
	}, [messages.length]);

	useEffect(() => {
		// socket = new WebSocket(import.meta.env.VITE_WS_HOST);
		const url = document.getElementById('chat-module-root')?.getAttribute('data-host') || '';
		socket = new WebSocket(url);

		let t: NodeJS.Timer;

		const onSocketOpen = () => {
			t = setInterval(function () {
				if (socket.readyState !== 1) {
					clearInterval(t);
					return;
				}
				socket.send(JSON.stringify({ ping: 'true' }));
			}, 55000);
		};

		const onMessage = async (msg: MessageEvent) => {
			let _msg = await new Response(msg.data).text();
			const { data } = JSON.parse(_msg);
			appendMessage(data, 'bot');
		};

		const onClickOutside = (e: MouseEvent) => {
			setShowChat(false);
		};

		document.addEventListener('click', onClickOutside);

		// socket.addEventListener('message', onMessage);
		// Fix closing websocket
		// socket.addEventListener('open', onSocketOpen);
		// Remove event listener to prevent memory leak
		return () => {
			clearInterval(t);
			document.removeEventListener('click', onClickOutside);
			// socket.removeEventListener('message', onMessage);
			// socket.removeEventListener('open', onSocketOpen);
			// socket.close();
		};
		// Append message does not change.
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div
				className='App'
				onClick={(e) => e.stopPropagation()}
				style={{
					width: showChat ? '' : '0',
					height: showChat ? '' : '0',
				}}
			>
				<div id='chat-module__header' onClick={() => setShowChat((prev) => !prev)}>
					<div id='chat-module__title'>
						<img src='/assets/images/logo2.jpg' alt='chat-module-logo' id='chat-module__logo' />
						<h3>
							{document.getElementById('chat-module-root')?.getAttribute('data-chat-name') ||
								'F.R.I.D.A.Y'}
						</h3>
					</div>
					<div
						id='chat-module__language-dropdown'
						onClick={(e) => {
							e.stopPropagation();
							setShowDropdown((prev) => !prev);
						}}
					>
						<GearIcon />
						<Dropdown
							open={showDropdown}
							values={Object.entries(LANGUAGES)
								.sort()
								.map(([key, value]) => ({ key, value }))}
							template={(
								{
									key,
									value,
								}: {
									key: string;
									value: {
										icon: string;
										name: string;
									};
								},
								{ selected = false }: { selected?: boolean }
							) => (
								<div className={`chat-module__language-item ${selected && 'selected'}`} key={key}>
									<img className='icon' src={value.icon} alt={`${value.name} icon`} />
									<span>{value.name}</span>
								</div>
							)}
							id='chat-module__language-list'
							onSelect={(key) => {
								setLanguage(key as LanguageKey);
								setMessages([]);
							}}
							selected={language}
						/>
					</div>
				</div>
				<div
					id='chat-module__body'
					style={{
						width: showChat ? '25rem' : 0,
						height: showChat ? '30rem' : 0,
						transition: 'all 0.25s ease',
						maxWidth: showChat ? '25rem' : 0,
					}}
				>
					<div id='chat-module__message-list' ref={messageListRef}>
						{messages.map((message, index) => (
							<MessageComponent
								key={message.dialogue_id}
								message={message}
								showEdit={showEdit}
								setShowEdit={(id) => setShowEdit(id)}
								onEditSubmit={onEditSubmit}
								onRate={onRate}
								last={index === messages.length - 1}
							/>
						))}
					</div>
					<form id='chat-module__form' onSubmit={onMessageSubmit}>
						<input
							className='chat-module__form-input'
							type='text'
							name='message'
							placeholder='Write a reply...'
						/>
						<div id='chat-module__form-input-icon-container'>
							<label htmlFor='file-img' className='chat-module__form-input-icon'>
								<div style={{ opacity: 0.5 }}>
									<ClipIcon />
								</div>
								<input id='file-img' type='file' />
							</label>
							<label htmlFor='voice' className='chat-module__form-input-icon'>
								<Record setFile={onRecord} />
							</label>
						</div>
						{/* <button id='chat-module__form-btn' type='submit'>
						Send
					</button> */}
					</form>
				</div>
			</div>
			<button
				id='chat-module__chat-btn'
				onClick={(e) => {
					e.stopPropagation();
					setShowChat((prev) => !prev);
				}}
			>
				<div
					className='chat-module__logo-btn'
					style={{
						opacity: showChat ? 1 : 0,
					}}
				>
					<XIcon />
				</div>
				<img
					src='/assets/images/logo2.jpg'
					alt='chat-module-logo'
					className='chat-module__logo-btn'
					style={{
						opacity: showChat ? 0 : 1,
					}}
				/>
			</button>
		</>
	);
}

export default App;
