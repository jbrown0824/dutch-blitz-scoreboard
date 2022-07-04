function getStandardDeviation (array: number[]): number {
	const n = array.length;
	const mean: number = array.reduce((a, b) => a + b) / n;
	return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export default getStandardDeviation;
