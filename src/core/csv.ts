function objectsToCSV<T extends {}>(data: T[]) {
	if (data.length === 0) {
		return '';
	}

	const headers = Object.keys(data[0]) as (keyof T)[];

	const dataRows = data.map(
		(item: T) => headers.map((header) => String(item[header])).join(',')
	);

	return [headers.join(',')].concat(dataRows).join('\n');
}

function randomHash() {
	return Math.random().toString(32).substring(2);
}

function downloadCSV(csvContent: string) {
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

	const link = document.createElement('a');

	const url = URL.createObjectURL(blob);

	link.setAttribute('href', url);
	link.setAttribute('download', `exported-data-${randomHash()}.csv`);

	link.click();

	URL.revokeObjectURL(url);
}

export function exportCSVData<T extends {}>(data: T[]) {
	downloadCSV(
		objectsToCSV(data)
	);
}
