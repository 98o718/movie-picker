import { type JSX } from 'solid-js';

import { Header } from './header';
import { MovieSection } from './movie-section';
import { PickerSection } from './picker-section';

export function App(): JSX.Element {

	return (
		<>
			<Header/>
			<main>
				<PickerSection/>
				<MovieSection/>
			</main>
		</>
	);
};
