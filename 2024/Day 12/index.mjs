import { readFileSync } from 'fs';

// Set up data
let data = readFileSync('2024/Day 12/data.txt').toString().split(/\r\n/).map( x => x.split(''));
let result = 0;

// Get the price of the fencing
result = price(data);

// Log the result
console.log(result);



// Today's functions

// Calculate the total price
function price(data) {
    let amount = 0;

    // Loop through all the characters and get the area and perimeter for each
    for (let i = 0; i < 26; i++) {
        let letter = String.fromCharCode(65 + i);
        let positions = [];

        // Get the positions of each character
        for (let j = 0; j < data.length; j++) {
            let line = data[j];

            for (let k = 0; k < line.length; k++) {
                let character = line[k];

                if (letter == character) {
                    positions.push([j, k]);
                }
            }
        }

        // Check if positions exist, and if so, calculate the area and perimeter
        if (!(positions[0] === undefined)) {
            // Get every single region inside of the positions
            let regions = getRegions(positions);
            
            console.log(letter);
            // console.log(region);
            let p = perimeter(letter, region, data);
            console.log(region.length);
            console.log(p);

            amount += region.length * p;
            console.log(amount);
        }
    }

    return amount;
}

// Calculate the perimeter of a region
function perimeter(letter, region, data) {
    let sides = 0;

    // Loop through all positions in the region and count the sides
    for (let i = 0; i < region.length; i++) {
        let pos = region[i];

        // Get the surrounding sides
        let surrounding = adjacent(pos, letter, data);

        // Count the sides
        for (let i = 0; i < 4; i++) {
            let side = surrounding[i];
            if (side) sides++;
        }
    }

    return sides;
}

// Check if there is a fence on each side
function adjacent(pos, letter, data) {
    let adjacent = [];

    if (data[pos[0] - 1]?.[pos[1]] == letter) adjacent.push(false);
    else adjacent.push(true);
    if (data[pos[0]][pos[1] + 1] == letter) adjacent.push(false);
    else adjacent.push(true);
    if (data[pos[0] + 1]?.[pos[1]] == letter) adjacent.push(false);
    else adjacent.push(true);
    if (data[pos[0]][pos[1] + 1] == letter) adjacent.push(false);
    else adjacent.push(true);

    return adjacent;
}

// Get regions inside of positions
function getRegions(positions) {
    let regions = new Set();

    // Example of DFS
    positions.forEach(pos => {
        let region = new Set();
        let next = [ pos ];
    
        while (next.length) {
            let found = [];
    
            next.forEach(pos => {
                if (data[pos[0]][pos[1]] == 9) score++;
                else found.push(...findNext(pos));
            });

            next = found;
        }
    });
}