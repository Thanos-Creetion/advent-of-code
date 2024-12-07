import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 7/data.txt').toString().split(/\r\n/);
let lines = [];
let result = 0;

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
    permutations.push(permutator(line[1].length - 1, 3));
}

// Check if equations are possible for each line
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let permutation = permutations[i];
    let value = line[0];
    let numbers = line[1];
    let possible = false;

    // Go through each combination of permutations
    for (let j = 0; j < permutation.length; j++) {
        let sum = 0;

        for (let k = 0; k < numbers.length - 1; k++) {
            if (sum == 0) {
                sum = expression(numbers[k], numbers[k + 1], permutation[j][k]);
            }
            else {
                sum = expression(sum, numbers[k + 1], permutation[j][k]);
            }
        }

        if (value == sum) {
            


            possible = true;
        }

        // Set sum back to zero for the next loop
        sum = 0;
    }

    // If this permutation is possible, add the value to result
    if (possible) {
        result += value;
    }

    // To see progress
    console.log((i + 1) + ' / ' + lines.length);
}



// Log the sum of all the possible equations
console.log(result);



// All the functions for today

// Do a equation
function expression(x, y, operator) {
    if (operator == 1) {
        let value = x + y;
        return value;
    }
    else if (operator == 2) {
        let value = x * y;
        return value;
    }
    else if (operator == 3) {
        let value = parseInt(x.toString() + y.toString());
        return value;
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
        max = numbers;
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
    // Initialize variables
    let current = previous.slice();
    let next = [];

    // Now without max call stack overflow
    while (true) {
        if (list.length == max) {
            return;
        }

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

        // Check how the arrays need to be set for the loop
        if ((next[0] === undefined)) {
            current = current.slice();
            next = [];
            
        }
        else {
            current = next.slice();
            next = [];
        }
    }
}