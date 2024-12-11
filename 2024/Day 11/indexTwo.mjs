import { readFileSync } from 'fs';

// Set up data
let data = readFileSync('2024/Day 11/data.txt').toString().split(' ').reduce((acc, val) => {
    acc[val] = 1;
    return acc;
}, {});

// Loop through the blinks
for (let i = 0; i < 75; i++) {
    let newData = {};

    for (let [stone, count] of Object.entries(data)) {
        let num = parseInt(stone);
        
        // Check if the stone is one
        if (num == 0) {
            newData[1] = (newData[1] || 0) + count;
        }
        // Split the numbers if length is even
        else if (num.toString().length % 2 == 0) {
            let str = num.toString();
            let first = parseInt(str.substring(0, str.length / 2));
            let second = parseInt(str.substring(str.length / 2));
            newData[first] = (newData[first] || 0) + count;
            newData[second] = (newData[second] || 0) + count;
        }
        // If no other rules apply, multiply by 2024
        else {
            let stone = num * 2024;
            newData[stone] = (newData[stone] || 0) + count;
        }
    }

    console.log(data);

    data = newData;
}

// Get the result
let result = Object.values(data).reduce((acc, val) => acc + val, 0);
console.log(result);