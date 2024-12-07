import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 7/data.txt').toString().split(/\r\n/);
let lines = [];
let sum = 0;

// Turn the original data into usefull line and convert all the strings to ints for easier calculations
for (let i = 0; i < data.length; i++) {
    let line = data[i].split(':');
    let numbers = line[1].match(/\d+/g);

    for (let j = 0; j < numbers.length; j++) {
        numbers[j] = parseInt(numbers[j]);
    }

    let newLine = [parseInt(line[0]), numbers];

    lines.push(newLine);
}

// Get the complete list of possible operator combinations for each line
let permutations = [];

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    permutations.push(permutator(line[1].length - 1, 2));
}

// Check if equations are possible for each line
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let permutation = permutations[i];
    let lineSum = 0;

    console.log(line);
    console.log(permutation);

    // Go through each combination of permutations
    for (let j = 0; j < permutation.length; j++) {

    }

    // Go through this permutation

    for (let j = 1; j < line[1].length; j++) {
        // lineSum += expression(line[1][j - 1], line[1][j], permutation[]);
    }
}



// Log the sum of all the possible equations
console.log(lines);
console.log(permutations);



// All the functions for today

// Do a equation
function expression(x, y, operator) {
    if (operator = 1) {
        return x + y;
    }
    else if (operator = 2) {
        return x * y;
    }
}

// Get all possible permutations
function permutator(length, numbers) {
    // Initialize variables
    let list = [];
    let base = [];
    let max = 0;

    // Check what the max number is
    if (length == 1) {
        max = 2;
    }
    else {
        max = Math.pow(numbers, length);
    }

    // Set up the base array and copy it to the list
    for (let i = 0; i < length; i++) {
        base.push(1);
    }

    // Copy the base to the list
    list.push(base);

    // Now create all the other permutations
    permute(list, base, numbers, max);

    return list
}

// Get one permutation
function permute(list, previous, numbers, max) {
    if (list.length == max) {
        return;
    }

    // Deep copy the array
    let current = previous.slice();

    // Create the indexes
    let index = -1;
    let lastIndex = -1;

    // Find the index of the number to increase
    for (let i = 0; i < current.length; i++) {
        if (current[current.length - 1 - i] < numbers && index == -1) {
            index = current.length - 1 - i;
            lastIndex = index + 1;
        }
    }

    // Create another array and deep copy the current
    let next = [];

    // Check if the last index exists
    if (!(current[lastIndex] === undefined)) {
        // Now if the new number is equal to number set all the following numbers to one
        if (current[lastIndex] == numbers) {
            next = current.slice();
            next[index]++;

            for (let i = lastIndex; i < current.length; i++) {
                next[i] = 1;
            }

            // Set index to -1 so the functions skips to the next recursion
            index = -1;

            // Now push the next array to the list
            list.push(next);
        }
    }
    
    // Push the array to the list
    if (list.length == max) {
        return;
    }

    if (index != -1) {
        current[index]++;
        list.push(current);
    }

    // Check which array needs to used for recursion
    if ((next[0] === undefined)) {
        permute(list, current, numbers, max);
    }
    else {
        permute(list, next, numbers, max);
    }
}