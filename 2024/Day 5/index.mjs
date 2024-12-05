import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 5/data.txt').toString().split(/\r\n/);
let rules = data.slice(0, data.indexOf(''));
let updates = data.slice(data.indexOf('') + 1, data.length);
let shadowUpdates = [];
let trueNumber = 0;
let falseNumber = 0;

// Change string arrays into actual Ints
for (let i = 0; i < rules.length; i++) {
    rules[i] = rules[i].split('|')
    rules[i][0] = parseInt(rules[i][0]);
    rules[i][1] = parseInt(rules[i][1]);
}

for (let i = 0; i < updates.length; i++) {
    updates[i] = updates[i].split(',');
    
    // Can't hardcode this convert to Int because updates are not uniform
    for (let j = 0; j < updates[i].length; j++) {
        updates[i][j] = parseInt(updates[i][j]);
        
    }
}

// Validate which updates are already in the right order
for (let i = 0; i < updates.length; i++) {
    let update = updates[i];
    let conforms = validate(rules, update);
    shadowUpdates.push(conforms);
}

// Sort the updates not in the right order
for (let i = 0; i < updates.length; i++) {
    // Check if the update is not in the right order
    if (shadowUpdates[i] == false) {
        updates[i] = sort(rules, updates[i]);
    }
}

// Get the middle page number of the correctly-ordered updates
for (let i = 0; i < updates.length; i++) {
    if (shadowUpdates[i]) {
        trueNumber += updates[i].at(updates[i].length / 2);
    }
}

// Now do the same for the uncorrectly-ordered updates after ordering them
for (let i = 0; i < updates.length; i++) {
    if (!shadowUpdates[i]) {
        falseNumber += updates[i].at(updates[i].length / 2);
    }
}

// Log the final total page number
console.log(trueNumber);
console.log(falseNumber);


// All the functions for today

// Validate if an update is correct
function validate(rules, update) {
    // Initialize variables
    let conforms = true;

    // Loop through all rules
    for (let j = 0; j < rules.length; j++) {
        let rule = rules[j];

        // Check if update contains rule
        if (update.includes(rule[0]) && update.includes(rule[1])) {
            // Check if update does not conforms to rule
            if (update.indexOf(rule[0]) > update.indexOf(rule[1])) {
                conforms = false;
            }
        }
    }

    return conforms;
}

// Sort an update
function sort(rules, update) {
    // Loop through all rules
    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];

        // Check if update contains rule
        if (update.includes(rule[0]) && update.includes(rule[1])) {
            // Check if update does not conforms to rule, and if not, sort the update
            let firstIndex = update.indexOf(rule[0]);
            let secondIndex = update.indexOf(rule[1]);

            if (firstIndex > secondIndex) {
                update.splice(firstIndex, 1);
                update.splice(secondIndex, 0, rule[0]);

                sort(rules, update);
            }
        }
    }

    return update;
}