import { createRoot, createSignal } from 'solid-js';
import { makePersisted } from '@solid-primitives/storage';

function createListStore() {
	const [list, setList] = makePersisted(
		createSignal(new Set<number>(), { equals: false }),
		{
			serialize: (l) => JSON.stringify(Array.from(l)),
			deserialize: (l) => new Set(JSON.parse(l)),
		}
	);

	const has = (id: number) => list().has(id);

	const toggle = (id: number) => {
		setList(
			(l) => {
				if (l.has(id)) {
					l.delete(id);
				} else {
					l.add(id);
				}

				return l;
			}
		)
	};

	const get = () => Array.from(list());

	return {
		toggle,
		has,
		get,
	};
}

export const listStore = createRoot(createListStore);
