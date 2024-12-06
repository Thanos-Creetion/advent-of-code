import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 6/data.txt').toString().split(/\r\n/);
let amount = 0;

// Do one simulation on the base data
let baseSimulation = simulate(data.slice());

// Log the results for part one
console.log(count(baseSimulation));

// Get an array of all the X positions
let list = getWalkedPos(baseSimulation);

// Run a new simulation with each dataset having one new obstacle on the position of an X
for (let i = 0; i < list.length; i++) {
    let simulatedData = data.slice();
    let obstacle = list[i];

    // Check if the obstacle would remove the guard, if so, skip this obstacle
    if (simulatedData[obstacle[0]][obstacle[1]] != '^') {
        simulatedData[obstacle[0]] = replaceAt(simulatedData[obstacle[0]], '#', obstacle[1]);
        simulatedData = simulate(simulatedData);
    }

    // To see the progress
    console.log('Simulation ' + (i + 1) + ' complete');
}

// Log the result
console.log(amount);



// Today's functions

// Run one simulation on the data
function simulate(data) {
    // Initialize variables
    let guard = '^';
    let steps = 0;

    while (isGuard(data, guard) && steps < 10000) {
        // Get the next position
        let currentPos = getGuardPos(data, guard);
        let nextPos = getNextPos(guard, currentPos);
    
        // Check if the next position exists
        if (isPos(data, nextPos)) {
            // If the next position is an obstacle, rotate
            if (data[nextPos[0]][nextPos[1]] == '#') {
                guard = rotate(guard);
                data[currentPos[0]] = replaceAt(data[currentPos[0]], guard, currentPos[1]);
            }
            // If there is no obstacle and the next position exists, move forward
            else {
                data[nextPos[0]] = replaceAt(data[nextPos[0]], guard, nextPos[1]);
                data[currentPos[0]] = replaceAt(data[currentPos[0]], 'X', currentPos[1]);
            }
        }
        // If the position does not exist move the guard out of area
        else {
            data[currentPos[0]] = replaceAt(data[currentPos[0]], 'X', currentPos[1]);
        }
        // Increase the step count
        steps++;
    }

    // Check if step count was exceeded and if so mark the obstacle as correct
    if (steps == 10000) {
        amount++;
    }

    return data;
}

// Count the amount of X'es
function count(data) {
    // Initialize variables
    let amount = 0;

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
    
        for (let j = 0; j < line.length; j++) {
            let character = line[j];
    
            if (character == 'X') {
                amount++;
            }
        }
    }

    return amount;
}

// Get all the positions of X
function getWalkedPos(data) {
    let list = [];

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
    
        for (let j = 0; j < line.length; j++) {
            let character = line[j];
    
            if (character == 'X') {
                list.push([i, j]);
            }
        }
    }

    return list;
}

// Check if the guard is in the area
function isGuard(data, guard) {
    let line = data.filter(str => str.includes(guard));

    // Check if line exists and return that
    return line.length > 0
}

// Get the guards position
function getGuardPos(data, guard) {
    // Initialize variables
    let linePos = 0;
    let guardPos = 0;

    // Get the line position and the guard position
    let line = data.filter(str => str.includes(guard));
    linePos = data.indexOf(line[0]);
    guardPos = line[0].indexOf(guard);

    return [linePos, guardPos]
}

// Get the new positions of the guard
function getNextPos(guard, pos) {
    if (guard == '^') {
        return [pos[0] - 1, pos[1]];
    }
    else if (guard == '>') {
        return [pos[0], pos[1] + 1];
    }
    else if (guard == 'v') {
        return [pos[0] + 1, pos[1]];
    }
    else if (guard == '<') {
        return [pos[0], pos[1] - 1];
    }
}

// Rotate to the right
function rotate(guard) {
    if (guard == '^') {
        return '>';
    }
    else if (guard == '>') {
        return 'v';
    }
    else if (guard == 'v') {
        return '<';
    }
    else if (guard == '<') {
        return '^';
    }
}

// Check if position exists
function isPos(data, pos) {
    if (!(data[pos[0]] === undefined)) {
        if (!(data[pos[1]] === undefined)) {
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

// Replace value in a string
function replaceAt(line, value, pos) {
    return line.substring(0, pos) + value + line.substring(pos + 1);
}