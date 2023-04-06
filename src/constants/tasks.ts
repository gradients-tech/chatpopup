export const TASK_LIST = {
	'translation-vi2en': [['1', 'msd_vi2en']],
	'translation-en2vi': [['1', 'msd_en2vi']],
	'msd-eng': [
		['1', 'msd_chitchat'],
		['2', 'msd_gen'],
	],
	'msd-vi': [
		['1', 'msd_vi2en'],
		['2', 'msd_chitchat'],
		['3', 'msd_gen'],
		['4', 'msd_en2vi'],
	],
	'task-oriented': [['1', 'msd_taskori']],
	'online-learning': [['1', 'online_learning_upsert']],
};

export type TaskListKey = keyof typeof TASK_LIST;
