import { createRoot, createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

import { Language } from '@api/movies-api';

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
	const [year, setYear] = makePersisted(createSignal(availableYears[0]));
	const [language, setLanguage] = makePersisted(createSignal(availableLanguages[0].value));
	const [shouldShowOnlyPopular, setShouldShowOnlyPopular] = makePersisted(createSignal(true));

	return {
		year,
		setYear,
		language,
		setLanguage,
		shouldShowOnlyPopular,
		setShouldShowOnlyPopular,
	};
}

export const filtersStore = createRoot(createFiltersStore);
