export type Message = {
	task: string;
	id: string;
	dialogue_id: string;
	username: string;
	message: string;
	origin: string;
	edit: null;
	rating: null | number;
	type: string;
	file?: {
		type: string;
		url: string;
	};
};

export type ILanguage = {
	key: string;
	flag: string;
};
