import { readFileSync } from 'fs';

// Set up data and sum
const data = readFileSync('2023/Day 3/data.txt').toString().split(/\r?\n/);
let sum = 0;
let gearSum = 0;

console.log(data);

// Loop for part numbers
for (let i = 0; i < data.length; i++) {
	// Set up variables and extract numbers with index from line
	let matchedNumber;
	let numberRegex = /\d+/g;

	while ((matchedNumber = numberRegex.exec(data[i]))) {
		// Get all adjacent characters
		let adjacent = getAdjacent(i, matchedNumber);

		// If a number is a part number, add it to the sum
		let symbolRegex = /[\#\$\%\&\*\+\-\=\@\/]/;
		let result = symbolRegex.test(adjacent);

		if (result == true) {
			sum += parseInt(matchedNumber[0]);
		}
	}
}

// Log the result sum
//console.log(sum);

// Loop for gear ratios
for (let i = 0; i < data.length; i++) {
	let matchedGear;
	let gearRegex = /\*/g;

	while ((matchedGear = gearRegex.exec(data[i]))) {
		// Check if gear has two numbers
		let adjacent = getAdjacentNumbers(i, matchedGear);

		// Get adjacent numbers
	}
}

// Log the result gear sum
//console.log(gearSum);

function getAdjacent(index, match) {
	let adjacent = '';

	if (index == 0) {
		adjacent += data[index].substring(match.index - 1, match.index + match[0].length + 1);
		adjacent += data[index + 1].substring(match.index - 1, match.index + match[0].length + 1);
	} else if (index == data.length - 1) {
		adjacent += data[index - 1].substring(match.index - 1, match.index + match[0].length + 1);
		adjacent += data[index].substring(match.index - 1, match.index + match[0].length + 1);
	} else {
		adjacent += data[index - 1].substring(match.index - 1, match.index + match[0].length + 1);
		adjacent += data[index].substring(match.index - 1, match.index + match[0].length + 1);
		adjacent += data[index + 1].substring(match.index - 1, match.index + match[0].length + 1);
	}

	return adjacent;
}

function getAdjacentNumbers(index, match) {
	let adjacent;
	let stringAbove;
	let stringMiddle;
	let stringBelow;

	// Get the adjacent strings
	if (index == 0) {
		stringMiddle = data[index].substring(match.index - 1, match.index + match[0].length + 1);
		stringBelow = data[index + 1].substring(match.index - 1, match.index + match[0].length + 1);
	} else if (index == data.length - 1) {
		stringAbove = data[index - 1].substring(match.index - 1, match.index + match[0].length + 1);
		stringMiddle = data[index].substring(match.index - 1, match.index + match[0].length + 1);
	} else {
		stringAbove = data[index - 1].substring(match.index - 1, match.index + match[0].length + 1);
		stringMiddle = data[index].substring(match.index - 1, match.index + match[0].length + 1);
		stringBelow = data[index + 1].substring(match.index - 1, match.index + match[0].length + 1);
	}

	// Get adjacent numbers
    let matchedNumber;
	let numbersRegex = /\d+/g;

	if (stringAbove != null) {
	    while ((matchedNumber = numbersRegex.exec(stringAbove)) !== null) {
			console.log(stringAbove);
            console.log(matchedNumber);
        }
	}
	if (stringMiddle != null) {
	    while ((matchedNumber = numbersRegex.exec(stringMiddle)) !== null) {
			console.log(stringMiddle);
            console.log(matchedNumber);
        }
	}
	if (stringBelow != null) {
	    while ((matchedNumber = numbersRegex.exec(stringBelow)) !== null) {
			console.log(stringBelow);
            console.log(matchedNumber);
        }
	}

	return adjacent;
}
