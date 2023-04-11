export const LANGUAGES = {
	en: {
		icon: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
		name: 'English (US)',
	},
	vi: {
		icon: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg',
		name: 'Vietnam (VI)',
	},
};

export type LanguageKey = keyof typeof LANGUAGES;
