export type Message = {
	task: 'en' | 'vi';
	id: string;
	dialogue_id: string;
	username: string;
	message: string;
	origin: string;
	edit: null;
	rating: null | number;
};
