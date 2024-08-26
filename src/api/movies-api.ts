export const enum Language {
	RUS = 'ru-Ru',
	ENG = 'en-Us',
}

export interface Movie {
	id: number;
	title: string;
	overview: string;
	poster_path: string | null;
}

interface MoviesFetcherParams {
	page: number;
	year: number;
	language: Language;
	shouldShowOnlyPopular: boolean;
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

export async function fetchMovies(params: MoviesFetcherParams): Promise<Movie[]> {
	const {
		page,
		year,
		language,
		shouldShowOnlyPopular,
	} = params;

	const url = new URL('https://api.themoviedb.org/3/discover/movie');

	url.searchParams.append('page', String(page));
	url.searchParams.append('primary_release_year', String(year));
	url.searchParams.append('sort_by', 'vote_count.desc');
	url.searchParams.append('language', language);

	if (shouldShowOnlyPopular) {
		url.searchParams.append('vote_count.gte', '500');
	}

	const response = await fetch(
		url,
		{ headers: { authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}` } }
	);

	const data = await response.json();

	return data.results.map(patchPosterURL);
}
