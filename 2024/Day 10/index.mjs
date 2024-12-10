import { readFileSync } from 'fs';

// Set up data
let data = readFileSync('2024/Day 10/data.txt').toString().split(/\r\n/);
let map = [];
let result = 0;

// Convert the data to a map of arrays with the height value and a secondary property
for (let i = 0; i < data.length; i++) {
    let line = data[i];
    let newLine = [];
    
    for (let j = 0; j < line.length; j++) {
        let number = parseInt(line[j]);
        
        newLine.push([number, 0]);
    }

    map.push(newLine);
}

// Find all positions of the trailheads
let positions = trailheads(data);

// Get the score of each trailhead
for (let i = 0; i < positions.length; i++) {
    let position = positions[i];

    result += score(map, position);
}

// Log the result
console.log(map);



// Today's functions

// Get all the positions of the trailheads
function trailheads(data) {
    let pos = [];

    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        for (let j = 0; j < line.length; j++) {
            let height = line[j];
            
            if (height == '0') {
                pos.push([parseInt(i), parseInt(j)]);
            }
        }
    }

    return pos;
}

// Get the score of a trailhead
function score(base, pos) {
    let map = base.slice();
    let current = pos.slice();
    let score = 0;
    let trails = 1;
    let crossroad = [];

    // Move through the map and find all the peaks you can get to from this trailhead
    while (true) {
        // Get the surrounding positions that are open
        let position = positions(map, current);

        // If there is more than one option, update last crossroad
        if (position.length > 1) {
            crossroad = position[0].slice();
        }

        // Move to the new position
        current = position[0].slice();

        // If the trail is finished, add one trail to score and close off path taken
        if (map[current[0]][current[1]][0] == 9) {
            score++;
            trails--;

            // Check if crossroad exists
            if (!(crossroad === undefined)) {
                // Close off the path and reset the crossroad
                map[crossroad[0]][crossroad[1]][1] = 1;
                crossroad = [];
            }
            
            // Set position back to the start of the trail
            current = pos.slice();
        }

        break;
    }

    return score;
}

// Get the surrounding positions if they exist
function positions(map, current) {
    let pos = [];

    // ADD THE CHECK FOR ONLY GETTING POSITIONS THAT ARE HIGHER

    // First get the position above the current position
    if (!(map[current[0] - 1][current[1]] === undefined)) {
        if (map[current[0] - 1][current[1]][1] == 0) {
            pos.push(map[current[0] - 1][current[1]]);
        }
    }
    // Then to the right
    if (!(map[current[0]][current[1] + 1] === undefined)) {
        if (map[current[0]][current[1] + 1][1] == 0) {
            pos.push(map[current[0]][current[1] + 1]);
        }
    }
    // Below the current position
    if (!(map[current[0] + 1][current[1]] === undefined)) {
        if (map[current[0] + 1][current[1]][1] == 0) {
            pos.push(map[current[0] + 1][current[1]]);
        }
    }
    // And finally to the left
    if (!(map[current[0]][current[1] - 1] === undefined)) {
        if (map[current[0]][current[1] - 1][1] == 0) {
            pos.push(map[current[0]][current[1] - 1]);
        }
    }

    return pos;
}