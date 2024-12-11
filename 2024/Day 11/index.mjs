import { readFileSync } from 'fs';

// Set up data
let data = readFileSync('2024/Day 11/data.txt').toString().split(' ').map(Number);

// Loop through the dataset for one blink
for (let i = 0; i < 75; i++) {
    data = blink(data);
    console.log('Done with ' + (i + 1) + ' / 75');
    console.log('Current size is ' + data.length);
}

// Log the result
console.log(data.length);

// Today's functions

// Loop through one blink
function blink(data) {
    let blink = [];

    for (let i = 0; i < data.length; i++) {
        let stone = data[i];
        
        // Check if the stone is one
        if (stone == 0) {
            blink.push(1);
        }
        // Split the numbers if length is even
        else if (stone.toString().length % 2 == 0) {
            let numbers = split(stone);
            blink.push(numbers[0]);
            blink.push(numbers[1]);
        }
        // If no other rules apply, multiply by 2024
        else {
            blink.push(stone * 2024);
        }
    }

    return blink;
}

// Split a number in two
function split(number) {
    let numbers = [];

    let string = number.toString();
    let first = string.substring(0, string.length / 2);
    let second = string.substring(string.length / 2);

    numbers.push(parseInt(first));
    numbers.push(parseInt(second));

    return numbers;
}