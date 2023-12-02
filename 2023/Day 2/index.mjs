import { readFileSync } from 'fs';

// Set up data and sum
let data = readFileSync('2023/Day 2/data.txt').toString().split(/\r?\n/);
let sum = 0;
let powerSum = 0;

data.forEach((data) => {
	// Initialize and get the id of the current game
	let id = data.match(/\d+/)[0];

	// Split data in usefull bytes
	data = data.split(':')[1];
	let sets = data.split(';');

	// Initialize minimum cube variables
	let miniRed = 0;
	let miniGreen = 0;
	let miniBlue = 0;

	let legal = true;
	// Check if every set is legal
	sets.forEach((set) => {
		// Initialize values
		let red = 0;
		let green = 0;
		let blue = 0;

		// Extract values from set
		if (set.includes('red')) {
			red = parseInt(set.match(/\d+(?= red)/)[0]);
		}
		if (set.includes('green')) {
			green = parseInt(set.match(/\d+(?= green)/)[0]);
		}
		if (set.includes('blue')) {
			blue = parseInt(set.match(/\d+(?= blue)/)[0]);
		}

		// Check if game is legal
		if (red > 12 || green > 13 || blue > 14) {
			legal = false;
		}

		// Check if cube values are new minimum
		if (miniRed == 0) {
			miniRed = red;
		} else if (red != 0 && miniRed < red) {
			miniRed = red;
		}

		if (miniGreen == 0) {
			miniGreen = green;
		} else if (green != 0 && miniGreen < green) {
			miniGreen = green;
		}

		if (miniBlue == 0) {
			miniBlue = blue;
		} else if (blue != 0 && miniBlue < blue) {
			miniBlue = blue;
		}
	});

	// If game is legal then add id to sum
	if (legal) {
		sum += parseInt(id);
	}

	// Add sum of minimum power to powerSum
	powerSum += miniRed * miniGreen * miniBlue;
});

// Give result sums
console.log(sum);
console.log(powerSum);
