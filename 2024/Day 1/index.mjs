import { readFileSync } from 'fs';

// Set up data
let data = readFileSync('2024/Day 1/data.txt').toString().split(/\s+/);
let listOne = [];
let listTwo = [];
let distance = 0;
let score = 0;

// Fill up the two lists
for (let i = 0; i < data.length; i += 2) {
    listOne.push(parseInt(data[i]));
    listTwo.push(parseInt(data[i + 1]));
}

// Sort the arrays
listOne.sort();
listTwo.sort();

// Get the distance between the location IDs and make sure its a positive number
for (let i = 0; i < listOne.length; i++) {
    let number = listOne[i] - listTwo[i];
    distance += Math.abs(number);
}

// Log the final distance
console.log(distance);

// Get the similarity score
for (let i = 0; i < listOne.length; i++) {
    let count = listTwo.filter((value) => value == listOne[i]);
    score += listOne[i] * count.length;
}

// Log the final score
console.log(score);