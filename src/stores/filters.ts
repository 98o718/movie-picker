import { createRoot, createSignal } from 'solid-js';

export const enum Language {
	RUS = 'ru-Ru',
	ENG = 'en-Us',
}

const minYear = 1920;
const maxYear = new Date().getFullYear();

export const availableYears = Array.from(
	{ length: maxYear - minYear + 1 },
	(_, index) => maxYear - index
);

export const availableLanguages = [
	{ title: 'Russian', value: Language.RUS },
	{ title: 'English', value: Language.ENG },
];

function createFiltersStore() {
	const [year, setYear] = createSignal(availableYears[0]);
	const [language, setLanguage] = createSignal(availableLanguages[0].value);

	return {
		year,
		setYear,
		language,
		setLanguage,
	};
}

export const filtersStore = createRoot(createFiltersStore);
