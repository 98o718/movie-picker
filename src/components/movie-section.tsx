import { Show, type JSX } from 'solid-js';

import { moviesStore } from '@stores/movies';

import { Loader } from '@components/loader';
import { MovieCard } from '@components/movie-card';

export function MovieSection(): JSX.Element {
	const { movie, loading } = moviesStore;
	
	return (
		<section>
			<Show
				when={ !loading() }
				fallback={ <Loader/> }
			>
				<Show when={ movie() }>
					{ (m) => <MovieCard movie={ m() } />}
				</Show>
			</Show>
		</section>
	);
}
