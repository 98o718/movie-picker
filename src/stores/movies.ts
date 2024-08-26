import {
	createSignal,
	createRoot,
	batch,
	createEffect,
	createResource,
} from "solid-js";

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
}

function makePosterURL(posterPath: string): string {
	return `https://image.tmdb.org/t/p/w300${posterPath}`;
}

function patchPosterURL(movie: Movie): Movie {
	return {
		...movie,
		poster_path: movie.poster_path
			? makePosterURL(movie.poster_path)
			: movie.poster_path,
	};
}

async function fetchMovies(page: number): Promise<Movie[]> {
	const url = new URL('https://api.themoviedb.org/3/discover/movie');

	url.searchParams.append('page', String(page));
	url.searchParams.append('primary_release_year', '1990');
	url.searchParams.append('sort_by', 'vote_count.desc');
	url.searchParams.append('vote_count.gte', '500');
	// url.searchParams.append('language', 'ru-RU');

	const response = await fetch(
		url,
		{ headers: { authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` } }
	);

	const data = await response.json();

	return data.results.map(patchPosterURL);
}

function createMoviesStore() {
	const [page, setPage] = createSignal(1);

	const [moviesOnPage] = createResource(
		page,
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
