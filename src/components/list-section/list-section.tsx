import { type JSX } from 'solid-js';

import { listStore } from '@stores/list';
import { exportCSVData } from '@core/csv';

import styles from './list-section.module.scss';

export function ListSection(): JSX.Element {
	const {
		get,
		isEmpty,
		clear,
	} = listStore;

	const handleExportClick = () => {
		const list = get();

		exportCSVData(list);
	};

	return (
		<section>
			<h6>List</h6>
			<div role='group'>
				<button
					onClick={ handleExportClick }
					disabled={ isEmpty() }
				>
					Export
				</button>
				<button
					class={ styles.clearButton }
					onClick={ clear }
					disabled={ isEmpty() }
				>
					Clear
				</button>
			</div>
		</section>
	)
}
