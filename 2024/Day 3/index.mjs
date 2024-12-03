import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 3/data.txt').toString();
let operations = Array.from(data.matchAll(/(mul\(\d{1,3},\d{1,3}\))/g));
let executeYes = Array.from(data.matchAll(/(do\(\))/g));
let executeNo = Array.from(data.matchAll(/(don't\(\))/g));
let result = 0;

// Clean each data entry into two values
for (let i = 0; i < operations.length; i++) {
    operations[i][1] = operations[i][0].match(/\d{1,3}/g);

    // Execute the operations if the condition is do()
    if (execute(operations[i].index)) {
        result += parseInt(operations[i][1][0]) * parseInt(operations[i][1][1]);
    }
}

// Log the final result
console.log(result);



// All the functions for this puzzle

// Find the most recent condition
function execute(index) {
    // Set up variables
    let lastYes = 0;
    let lastNo  = 0;

    // Find the last valid conditions
    for (let i = 0; i < executeYes.length; i++) {
        if (executeYes[i].index < index) {
            lastYes = executeYes[i].index;
        }
    }

    for (let i = 0; i < executeNo.length; i++) {
        if (executeNo[i].index < index) {
            lastNo = executeNo[i].index;
        }
    }

    // At the start of the program the operations are enabled
    if (lastYes == 0 && lastNo == 0) {
        return true;
    }

    // If the do() condition is more recent then return true, else return false
    if (lastYes > lastNo) {
        return true;
    }
    else {
        return false;
    }
}