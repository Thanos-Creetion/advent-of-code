import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 2/data.txt').toString().split(/\r\n/);
let counter = 0;


// Clean each data entry into a report
for (let i = 0; i < data.length; i++) {
    data[i] = data[i].split(/\s+/);
}

// Check is each report is valid by checking if each value increases/decreases and if the change is between 1 and 3
for (let i = 0; i < data.length; i++) {
    // Iterate over the report
    let valid = check(data[i]);

    // Check if the report is valid
    if (valid) {
        counter++;
    } 
    // The recursion for Part Two
    else {
        let report = [];
        for (let j = 0; j < data[i].length; j++) {
            // Copy the array and splice to create the new array to iterate over
            report = data[i].slice();
            report.splice(j, 1);
    
            let tempValid = check(report);
            if (tempValid) {
                valid = true; 
            }
        }

        if (valid) {
            counter++;
        }
    }
}

// Log the amount of safe reports
console.log(counter);



// All the functions for this puzzle

// One iteration of checking a report
function check(report) {
    // Set up variables
    let isValid = false;

    // Go over each report and check the different conditions
    let increaseResults = increase(report);
    let decreaseResults = decrease(report);
    let validResults = valid(report);

    // Check if the report is valid
    if ((increaseResults || decreaseResults) && validResults) {
        isValid = true;
    }

    return isValid;
}

// Does the report only increase in value?
function increase(report) {
    let increases = true;
    let previousValue = 0;
    let value = 0;

    for (let i = 0; i < report.length; i++) {
        value = parseInt(report[i]);

        // Check if the condition is false
        if (!(previousValue <= value)) {
            increases = false;
        }

        previousValue = value;
    }

    return increases;
}

// Does the report only decrease in value?
function decrease(report) {
    let decreases = true;
    let previousValue = 100;
    let value = 0;

    for (let i = 0; i < report.length; i++) {
        value = parseInt(report[i]);

        // Check if the condition is false
        if (!(previousValue >= value)) {
            decreases = false;
        }

        previousValue = value;
    }

    return decreases;
}

// Is the change between 1 and 3?
function valid(report) {
    let valid = true;
    let previousValue = 0;
    let value = 0;

    for (let i = 0; i < report.length; i++) {
        value = parseInt(report[i]);

        if (previousValue == 0) {
            previousValue = value - 1;
        }

        let change = Math.abs(previousValue - value);

        // Check if the condition is false
        if (!(1 <= change && change <= 3)) {
            valid = false;
        }

        previousValue = value;
    }

    return valid;
}