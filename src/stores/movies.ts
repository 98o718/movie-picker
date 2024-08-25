import { createCachedResource } from 'solid-cached-resource';
import { createSignal, createRoot, batch } from "solid-js";

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
}

const pageSizeCache: Record<number, number> = {};

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

	url.searchParams.append('year', '1990');
	url.searchParams.append('page', String(page));
	url.searchParams.append('vote_average.gte', '10');

	const response = await fetch(
		url,
		{ headers: { authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` } }
	);

	const data = await response.json();

	pageSizeCache[page] = data.results.length;

	return data.results.map(patchPosterURL);
}

function createMoviesStore() {
	const [page, setPage] = createSignal(1);
	const [movies] = createCachedResource(
		page,
		fetchMovies,
		{ refetchOnMount: false }
	);

	const [index, setIndex] = createSignal(0);

	const incrementPage = () => setPage(p => ++p);
	const decrementPage = () => setPage(p => --p);

	const loadNextMovie = () => {
		if (!movie()) {
			return;
		}

		const nextIndex = index() + 1;

		const currentMovies = movies();

		if (!currentMovies) {
			return;
		}

		if (nextIndex === currentMovies.length) {
			return batch(() => {
				setIndex(0);
				incrementPage();
			})
		}

		setIndex(nextIndex);
	};

	const loadPrevMovie = () => {
		const prevIndex = index() - 1;

		if (prevIndex === -1) {
			if (page() === 1) {
				return;
			}

			return batch(() => {
				setIndex((pageSizeCache[page() - 1]) - 1);
				decrementPage();
			})
		}

		setIndex(prevIndex);
	};

	const movie = (): Movie | undefined => movies()[index()];

	const loading = () => movies.loading;

	return {
		movie,
		loadNextMovie,
		loadPrevMovie,
		loading,
	};
}

export const moviesStore = createRoot(createMoviesStore);
