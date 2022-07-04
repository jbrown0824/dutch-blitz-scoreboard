function average(array: number[]): number {
	let sum = 0;
	array.forEach(value => {
		sum += value;
	});

	return sum / array.length;
}

export default average;
