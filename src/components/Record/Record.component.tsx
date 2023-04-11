import { FC, HTMLAttributes, useRef, useState } from 'react';
import { MicrophoneFilledIcon, MicrophoneIcon } from '../../assets/icon';

const checkUserMedia = () =>
	navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined;

interface IRecord extends HTMLAttributes<HTMLDivElement> {
	setFile?: (file: File) => void; // use this to extract the file
	setBlob?: (chunks: Blob[]) => void; // use this to extract the blob chunks
	setLength?: (length: number) => void; // use this to get the length of the recording
}

const Record: FC<IRecord> = ({ setFile, setBlob, setLength, style = { opacity: 0.5 } }) => {
	const [recording, setRecording] = useState(false);
	const [timer, setTimer] = useState(0);
	const microphoneRef = useRef<HTMLDivElement>(null);
	const mediaRecorderRef = useRef<MediaRecorder>();
	const timerRef = useRef<NodeJS.Timer>();
	const chunksRef = useRef<Blob[]>([]);

	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;

	const onRecord: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!checkUserMedia()) return;
		if (recording) return;
		navigator.mediaDevices
			.getUserMedia(
				// constraints - only audio needed for this app
				{
					audio: true,
				}
			)
			// Success callback
			.then((stream) => {
				// Generate a new recorder
				mediaRecorderRef.current = new MediaRecorder(stream);
				mediaRecorderRef.current.start();
				setRecording(true);
				const elm = microphoneRef.current as HTMLDivElement;
				elm.style.color = 'red';
				elm.style.opacity = '1';
				// Push the recorded chunks:Blob into ref.
				mediaRecorderRef.current.ondataavailable = (e) => {
					chunksRef.current.push(e.data);
				};
				// Start timer
				timerRef.current = setInterval(() => {
					setTimer((prev) => prev + 1);
				}, 1000);
			})

			// Error callback
			.catch((err) => {
				console.error(`The following getUserMedia error occurred: ${err}`);
			});
	};

	const onRecordStop: React.MouseEventHandler<HTMLDivElement> = (e) => {
		if (!recording) return;
		mediaRecorderRef.current?.stop();
		setRecording(false);
		const elm = microphoneRef.current as HTMLDivElement;
		elm.style.color = 'black';
		elm.style.opacity = '0.5';
		clearInterval(timerRef.current);
		setLength && setLength(timer);
		setTimer(0);
		// on recording stop
		(mediaRecorderRef.current as MediaRecorder).onstop = () => {
			// Generate blob from Blob[]
			const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
			setBlob && setBlob(chunksRef.current);
			// Generate file from blob
			// Must specify file type, file name correctly.
			const file = new File([blob], 'audio.mp3', {
				type: 'audio/mp3',
			});
			setFile && setFile(file);
			// Read the file and play
			// const filereader = new FileReader();
			// filereader.readAsDataURL(file);
			// filereader.onload = () => {
			// 	console.log(filereader.result);
			// };
			// Reset
			chunksRef.current = [];
			// Create audio
			// const audioURL = window.URL.createObjectURL(blob);
			// const audio = new Audio(audioURL);
			// audio.play();
		};
	};

	return (
		<div
			onMouseDown={onRecord}
			ref={microphoneRef}
			className='chat-module__record'
			onMouseUp={onRecordStop}
			style={style}
		>
			{recording ? <MicrophoneFilledIcon /> : <MicrophoneIcon />}
			{recording && (
				<div className='chat-module__record-wave'>
					{minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
				</div>
			)}
		</div>
	);
};

export default Record;
