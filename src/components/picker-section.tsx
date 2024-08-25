import { type JSX } from 'solid-js';

import { moviesStore } from '../stores/movies';

export function PickerSection(): JSX.Element {
	const { loadNextMovie, loadPrevMovie, loading } = moviesStore;

	return (
		<section>
			<div role='group'>
				<button
					class='secondary'
					onClick={ loadPrevMovie }
					disabled={ loading() }
				>
					Back
				</button>
				<button
					onClick={ loadNextMovie }
					disabled={ loading() }
				>
					Pick
				</button>
				<button
					class='secondary'
					onClick={ loadNextMovie }
					disabled={ loading() }
				>
					Next
				</button>
			</div>
		</section>
	);
}
