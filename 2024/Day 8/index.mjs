import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 8/data.txt').toString().split(/\r\n/);
let antinodes = [];
let result = 0;

// Go through all the frequencies and get the amount of antinodes
for (let i = 0; i < 62; i++) {
    // First get the positions of the antenna's
    let positions = antenna(data, character(i));
    
    // Now go through all the antenna's and calulate the antinodes
    for (let j = 0; j < positions.length; j++) {
        // Get the current antenna
        let antenna = positions[j];

        // If there is more than one antenna, add the positions ot the antinode list
        if (positions.length > 1) {
            // Check if the antinode already exists
            if (exists(data, antenna)) {
                // Stringify the arrays so we can check if the antinode is unique
                let a = JSON.stringify(antinodes);
                let b = JSON.stringify(antenna);

                if (a.indexOf(b) == -1) {
                    antinodes.push(antenna);
                }
            }
        }
        
        // Go through all other antenna's and calculate the antinodes
        for (let k = j + 1; k < positions.length; k++) {
            // Get the next antenna
            let nextAntenna = positions[k];

            // Get the difference between the antenna's
            let diff = [Math.abs(antenna[0] - nextAntenna[0]), Math.abs(antenna[1] - nextAntenna[1])];
            let lower = antenna[1] < nextAntenna[1];
            
            // Get all the valid antinodes
            antinode(data, antinodes, antenna, nextAntenna, diff, lower);
        }
    }
}

// Count and log the result
result = antinodes.length;
console.log(result);



// Today's functions

// Get the correct character
function character(value) {
    if (value < 10) {
        return String.fromCharCode(value + 48);
    }
    else if (value < 36) {
        return String.fromCharCode(value + 55);
    }
    else if (value < 62) {
        return String.fromCharCode(value + 61);
    }
}

// Get all the positions of a certain frequency
function antenna(data, frequency) {
    let positions = [];

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        
        for (let j = 0; j < line.length; j++) {
            let character = line[j];
            
            if (frequency == character) {
                positions.push([i, j]);
            }
        }
    }

    return positions;
}

// Check if position exists on the grid
function exists(data, pos) {
    // Check if line exists
    if (!(data[pos[0]] === undefined)) {
        let line = data[pos[0]];

        if (!(line[pos[1]] === undefined)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

// Get all the antinodes
function antinode(data, antinodes, antenna, nextAntenna, diff, lower) {
    // Initialize variables
    let upAntinode = antenna;
    let downAntinode = nextAntenna;

    // Do two loops to check in both directions first check above
    while (true) {
        if (lower) {
            upAntinode = [upAntinode[0] - diff[0], upAntinode[1] - diff[1]];
        }
        else {
            upAntinode = [upAntinode[0] - diff[0], upAntinode[1] + diff[1]];
        }

        // Check if the antinode exists
        if (exists(data, upAntinode)) {
            // Stringify the arrays so we can check if the antinode is unique
            let a = JSON.stringify(antinodes);
            let b = JSON.stringify(upAntinode);

            if (a.indexOf(b) == -1) {
                antinodes.push(upAntinode);
            }
        }
        else {
            break;
        }
    }

    // Then check below
    while (true) {
        if (lower) {
            downAntinode = [downAntinode[0] + diff[0], downAntinode[1] + diff[1]];
        }
        else {
            downAntinode = [downAntinode[0] + diff[0], downAntinode[1] - diff[1]];
        }

        // Check if the antinode exists
        if (exists(data, downAntinode)) {
            // Stringify the arrays so we can check if the antinode is unique
            let a = JSON.stringify(antinodes);
            let b = JSON.stringify(downAntinode);

            if (a.indexOf(b) == -1) {
                antinodes.push(downAntinode);
            }
        }
        else {
            break;
        }
    }
}