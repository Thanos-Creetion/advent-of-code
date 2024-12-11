import { readFileSync } from 'fs';

// Set up data
const data = readFileSync('2024/Day 10/data.txt').toString().split(/\r\n/).map(x => x.split('').map(Number));

// Find all positions of the trailheads
let trailheads = [];

for (let i = 0; i < data.length; i++) {
    let line = data[i];

    for (let j = 0; j < line.length; j++) {
        let height = line[j];
        
        if (height == 0) {
            trailheads.push([i, j]);
        }
    }
}

// Find the surrounding positions
function findNext(pos) {
    let current = data[pos[0]][pos[1]];
    let next = [];

    if (data[pos[0] + 1]?.[pos[1]] == current + 1) next.push([pos[0] + 1, pos[1]]);
    if (data[pos[0] - 1]?.[pos[1]] == current + 1) next.push([pos[0] - 1, pos[1]]);
    if (data[pos[0]][pos[1] + 1] == current + 1) next.push([pos[0], pos[1] + 1]);
    if (data[pos[0]][pos[1] - 1] == current + 1) next.push([pos[0], pos[1] - 1]);

    return next;
}

// Get the total score of all the trailheads
let score = 0;

// Loop through every trailhead
trailheads.forEach(pos => {
    let next = [ pos ];

    while (next.length) {
        let found = [];

        next.forEach(pos => {
            if (data[pos[0]][pos[1]] == 9) score++;
            else found.push(...findNext(pos));
        });
    }
});

// Log the score
console.log(score);