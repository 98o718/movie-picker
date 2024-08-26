import { For, type JSX } from 'solid-js';

import {
	filtersStore,
	availableLanguages,
	availableYears,
} from '../stores/filters';

import { Language } from '../api/movies-api';

export function FiltersSection(): JSX.Element {
	const {
		year,
		setYear,
		language,
		setLanguage,
		shouldShowOnlyPopular,
		setShouldShowOnlyPopular,
	} = filtersStore;

	const handleYearChange = (event: Event & { currentTarget: HTMLSelectElement }) => {
		setYear(Number(event.currentTarget.value));
	};

	const handleLanguageChange = (event: Event & { currentTarget: HTMLSelectElement }) => {
		setLanguage(event.currentTarget.value as Language);
	};

	const handleOnlyPopularShowingChange = (event: Event & { currentTarget: HTMLInputElement }) => {
		setShouldShowOnlyPopular(event.currentTarget.checked);
	};

	return (
		<section>
			<div role='group'>
				<select name="year" aria-label="Select year..." onChange={ handleYearChange }>
					<option disabled>
						Select year...
					</option>
					<For each={ availableYears }>
						{ (y) => <option value={ y } selected={ year() === y }>{ y }</option> }
					</For>
				</select>
				<select name="language" aria-label="Select display language..." onChange={ handleLanguageChange }>
					<option disabled>
						Select display language...
					</option>
					<For each={ availableLanguages }>
						{ ({ title, value }) => <option value={ value } selected={ language() === value }>{ title }</option> }
					</For>
				</select>
			</div>
			<label>
				<input type="checkbox" checked={ shouldShowOnlyPopular() } onChange={ handleOnlyPopularShowingChange }/>
				Show only popular
			</label>
		</section>
	);
}
