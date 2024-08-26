import {
	createSignal,
	createRoot,
	batch,
	createEffect,
	createResource,
	on,
	createComputed,
} from "solid-js";

import { fetchMovies, Movie } from '../api/movies-api';

import { filtersStore } from './filters';

function createMoviesStore() {
	const [page, setPage] = createSignal(1);

	const {
		year,
		language,
		shouldShowOnlyPopular,
	} = filtersStore;

	const filters = () => ({
		year: year(),
		language: language(),
		shouldShowOnlyPopular: shouldShowOnlyPopular(),
	});

	const [moviesOnPage] = createResource(
		() => ({
			page: page(),
			...filters(),
		}),
		fetchMovies
	);

	const [movies, setMovies] = createSignal<Movie[]>([]);

	createEffect(() => {
		const moviesToAdd = moviesOnPage();

		if (
			moviesOnPage.loading
			|| moviesToAdd === undefined
			|| moviesToAdd.length === 0
		) {
			return;
		}

		setMovies(m => m.concat(moviesToAdd));
	})

	const [index, setIndex] = createSignal(0);

	createComputed(on(
		filters,
		() => batch(() => {
			setMovies([]);
			setPage(1);
			setIndex(0);
		})
	));

	const incrementPage = () => setPage(p => ++p);

	const loadNextMovie = () => {
		const nextIndex = index() + 1;

		const shouldIncrementPage = nextIndex === movies().length;

		if (shouldIncrementPage && moviesOnPage()?.length === 0) {
			return;
		}

		return batch(() => {
			if (shouldIncrementPage) {
				incrementPage();
			}

			setIndex(nextIndex);
		});
	};

	const loadPrevMovie = () => {
		const prevIndex = index() - 1;

		if (prevIndex === -1) {
			return;
		}

		setIndex(prevIndex);
	};

	const movie = (): Movie | undefined => movies()[index()];

	const loading = () => moviesOnPage.loading;

	createEffect(() => {
		if (movie() === undefined && !loading()) {
			loadPrevMovie();
		}
	});

	const cantBack = () => index() === 0;
	const cantNext = () => index() === movies().length - 1 && moviesOnPage()?.length === 0;

	return {
		movie,
		loadNextMovie,
		loadPrevMovie,
		loading,
		cantBack,
		cantNext,
	};
}

export const moviesStore = createRoot(createMoviesStore);
