import { Show, type JSX } from 'solid-js';

import { type Movie } from '../../api/movies-api';

import styles from './movie-card.module.scss';

import noPosterImage from './images/no-poster.png';

interface MovieCardProps {
	movie: Movie;
}

export function MovieCard(props: MovieCardProps): JSX.Element {
	return (
		<article>
			<h6 class={ styles.title }>{ props.movie.title }</h6>
			<div class={ styles.details }>
				<img
					class={ styles.poster }
					src={ props.movie.poster_path ?? noPosterImage }
					width={ 300 }
					height={ 450 }
				/>
				<Show when={ props.movie.overview } >
					<p>{ props.movie.overview }</p>
				</Show>
			</div>
		</article>
	)
}
