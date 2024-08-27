import { type JSX } from 'solid-js';

import { Header } from '@components/header';
import { MovieSection } from '@components/movie-section';
import { PickerSection } from '@components/picker-section';
import { FiltersSection } from '@components/filters-section';
import { ListSection } from '@components/list-section';

export function App(): JSX.Element {

	return (
		<>
			<Header/>
			<main>
				<FiltersSection/>
				<PickerSection/>
				<MovieSection/>
			</main>
			<footer>
				<ListSection/>
			</footer>
		</>
	);
};
