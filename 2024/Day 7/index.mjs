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


// Check if equations are possible



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
    let max = Math.pow(length, numbers);

    // Set up the base permutation and push it to the list
    let base = [];

    for (let i = 0; i < length; i++) {
        base.push(1);
    }

    list.push(base);

    // Now create all the other permutations
    for (let i = 0; i < max; i++) {
        let permutation = base;
        let index = length - 1;

        if (permutation[index] < numbers) {
            permutation[index]++;
            list.push(permutation);
        }
        else if (index != 0) {
            index--;
        }
    }

    return list
}

// Get one permutation
function permute(list, array, index, numbers) {
    if (array[index] < numbers) {
        array[index]++;
        list.push(array);
    }
    else if (index != 0) {
        index--;



    }

    for (let i = 0; i < array.length; i++) {
        
        
    }


}