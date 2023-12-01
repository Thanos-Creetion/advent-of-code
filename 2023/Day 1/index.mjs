import { readFileSync } from 'fs';

// Set up data and sum
let data = readFileSync('2023/Day 1/data.txt').toString().split(/\r?\n/);
let sum = 0;

// Call foreach on data and log the result sum
data.forEach((data) => {
    let pos = [];
    let number = 0;

    // Map the written numbers to a digit and use the map with a regex to fix the data
    let mappedNumbers = {
        one: 'o1e',
        two: 't2o',
        three: 't3e',
        four: 'f4r',
        five: 'f5e',
        six: 's6x',
        seven: 's7n',
        eight: 'e8t',
        nine: 'n9e',
    };

    data = data.replace(/one|two|three|four|five|six|seven|eight|nine/g, m => mappedNumbers[m]);
    data = data.replace(/one|two|three|four|five|six|seven|eight|nine/g, m => mappedNumbers[m]);

    // Get the positions of every digit in the string
    for (let i = 0; i < data.length; i++) {
        let charCode = data[i].charCodeAt();

        if (charCode > 47 && charCode < 58) {
            pos.push(i);
        }
    }

    // Get the number from the string
    number = data[pos[0]] + data[pos[pos.length - 1]];

    // Add number to sum
    sum += parseInt(number);
});

// Log the result
console.log(sum);
