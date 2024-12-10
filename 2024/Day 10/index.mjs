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

    let count = score(map, position);
    console.log('Done with ' + (i + 1) + ' / ' + positions.length);
    result += count;
}

// Log the result
console.log(result);



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
    let map = JSON.parse(JSON.stringify(base));
    let current = JSON.parse(JSON.stringify(pos));
    // let map = base.slice();
    // let current = pos.slice();
    let score = 0;
    let trails = 0;
    let crossroad = [];

    // console.log('START');

    // Move through the map and find all the peaks you can get to from this trailhead
    while (true) {
        // Get the surrounding positions that are open
        let position = places(map, current);

        // If there is more than one option, update last crossroad
        if (position.length > 1) {
            crossroad = position[0].slice();
            trails++;
        }

        // console.log(position);
        // console.log('CURRENT POSITION');
        // console.log(current);
        // console.log('OPTIONS');
        // console.log(position);
        // console.log('CURRENT HEIGHT');
        // console.log(map[current[0]][current[1]]);
        // console.table(map);

        // Move to the new position of it exists
        if (position.length > 0) {
            current = position[0].slice();
        }

        // If the trail is finished, add one trail to score and close off path taken
        if (map[current[0]][current[1]][0] == 9) {
            score++;
            // console.log('TRAIL FINISHED');

            // Check if there are more trails
            if (trails > 0) {
                trails = 0;
            }
            else {
                break;
            }

            // Check if crossroad exists
            if (!(crossroad === undefined)) {
                // Close off the path and reset the crossroad
                map[crossroad[0]][crossroad[1]][1] = 1;
                map[current[0]][current[1]][1] = 1;
                crossroad = [];
            }
            
            // Set position back to the start of the trail
            current = pos.slice();
        }
        else if (position.length == 0) {
            // Check if there are more trails
            if (trails > 0) {
                trails = 0;
            }
            else {
                break;
            }

            // Check if crossroad exists
            if (!(crossroad === undefined)) {
                // Close off the path and reset the crossroad
                map[crossroad[0]][crossroad[1]][1] = 1;
                crossroad = [];
            }
            else {
                // Close of the current path just in case
                map[current[0]][current[1]][1] = 1;
            }

            // Set position back to the start of the trail
            current = JSON.parse(JSON.stringify(pos));
        }
    }

    return score;
}

// Get the surrounding positions if they exist
function places(map, current) {
    let pos = [];
    let currentPlace = map[current[0]][current[1]];

    // First get the position above the current position
    if (!(map[current[0] - 1] === undefined)) {
        let line = map[current[0] - 1];

        if (!(line[current[1]] === undefined)) {
            let place = line[current[1]];

            // Check if path is open
            if (place[1] == 0) {
                // Check if height is current + 1
                if (place[0] == currentPlace[0] + 1) {
                    pos.push([current[0] - 1, current[1]]);
                }
            }
        }
    }
    // Then to the right
    if (!(map[current[0]] === undefined)) {
        let line = map[current[0]];

        if (!(line[current[1] + 1] === undefined)) {
            let place = line[current[1] + 1];

            // Check if path is open
            if (place[1] == 0) {
                // Check if height is current + 1
                if (place[0] == currentPlace[0] + 1) {
                    pos.push([current[0], current[1] + 1]);
                }
            }
        }
    }
    // Below the current position
    if (!(map[current[0] + 1] === undefined)) {
        let line = map[current[0] + 1];

        if (!(line[current[1]] === undefined)) {
            let place = line[current[1]];

            // Check if path is open
            if (place[1] == 0) {
                // Check if height is current + 1
                if (place[0] == currentPlace[0] + 1) {
                    pos.push([current[0] + 1, current[1]]);
                }
            }
        }
    }
    // And finally to the left
    if (!(map[current[0]] === undefined)) {
        let line = map[current[0]];

        if (!(line[current[1] - 1] === undefined)) {
            let place = line[current[1] - 1];

            // Check if path is open
            if (place[1] == 0) {
                // Check if height is current + 1
                if (place[0] == currentPlace[0] + 1) {
                    pos.push([current[0], current[1] - 1]);
                }
            }
        }
    }

    return pos;
}