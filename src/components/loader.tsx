import { type JSX } from 'solid-js';

export function Loader(): JSX.Element {
	return (
		<article aria-busy="true"></article>
	);
}
