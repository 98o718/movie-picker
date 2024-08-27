import { type JSX } from 'solid-js';

import { moviesStore } from '../../stores/movies';
import { listStore } from '../../stores/list';

import styles from './picker-section.module.scss';

interface ButtonContentProps {
	isPicked: boolean;
}

function ButtonContent(props: ButtonContentProps): JSX.Element {
	return (
		<>
			<span
				classList={ {
					[styles.buttonContent]: true,
					[styles.hidden]: props.isPicked
				} }
			>
				Pick
			</span>
			<span
				classList={ {
					[styles.buttonContent]: true,
					[styles.hidden]: !props.isPicked
				} }
			>
				Unpick
			</span>
		</>
	);
}

export function PickerSection(): JSX.Element {
	const {
		movie,
		loadNextMovie,
		loadPrevMovie,
		loading,
		cantBack,
		cantNext,
	} = moviesStore;

	const {
		toggle,
		has,
	} = listStore;

	const isPicked = () => {
		const currentMovie = movie();

		return currentMovie !== undefined && has(currentMovie.id);
	}

	const toggleMovie = () => {
		const currentMovie = movie();

		if (currentMovie === undefined) {
			return;
		}

		toggle(currentMovie.id);

		// TODO: Maybe we should automatically load next movie on pick
		// if (isPicked()) {
		// 	loadNextMovie();
		// }
	}

	return (
		<section>
			<div role='group'>
				<button
					class={ styles.secondaryButton }
					onClick={ loadPrevMovie }
					disabled={ loading() || cantBack() }
				>
					Back
				</button>
				<button
					onClick={ toggleMovie }
					disabled={ loading() }
					classList={ {
						[styles.unpickButton]: isPicked()
					} }
				>
					<ButtonContent isPicked={ isPicked() }/>
				</button>
				<button
					class={ styles.secondaryButton }
					onClick={ loadNextMovie }
					disabled={ loading() || cantNext() }
				>
					Next
				</button>
			</div>
		</section>
	);
}
