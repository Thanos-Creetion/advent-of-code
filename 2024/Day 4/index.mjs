import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 4/data.txt').toString().split(/\r\n/);

// Check and log the amount of matches
console.log(match('XMAS'));

// Now check and log for the actual solution of the puzzle smh
console.log(matchX());



// All the functions for today

// Check for matches in data
function match(word) {
    // Initialize variables
    let totalMatches = 0;

    // Loop through all lines
    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        // Loop through all character
        for (let j = 0; j < line.length; j++) {
            let character = line[j];
            
            // Check around every character for matches if the character is X
            if (word[0] == character) {
                totalMatches += horizontalMatch(word, line, j);
                totalMatches += verticalMatch(word, data, i, j);
                totalMatches += diagonalMatch(word, data, i, j);
            }
        }
        
    }

    return totalMatches;
}

// Check for CROSS-MAS matches in data
function matchX() {
    // Initialize variables
    let totalMatches = 0;

    // Loop through all lines
    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        
        // Loop through all characters
        for (let j = 0; j < line.length; j++) {
            let character = line[j];

            // Check around every A for matches
            if (character == 'A') {
                // Check if both diagonals have a MAS
                if (firstDiagonalMatch(data, i, j) && secondDiagonalMatch(data, i, j)) {
                    totalMatches++;
                }
            }
        }
    }

    return totalMatches;
}

// Check for horizontal matches
function horizontalMatch(word, line, pos) {
    // Initialize variables
    let horizontalMatches = 0;
    let forwardMatch = true;
    let backwardsMatch = true;

    // First check for a match forwards
    for (let i = 1; i < word.length; i++) {
        let character = line[pos + i];

        // Check if character is defined
        if (character != null) {
            // If there is no match set bool to false
            if (!(character == word[i])) {
                forwardMatch = false;
            }
        }
        // If undefined then there is no match
        else {
            forwardMatch = false;
        }       
    }

    // Now check for a match backwards
    for (let i = 1; i < word.length; i++) {
        let character = line[pos - i];

        // Check if character is defined
        if (character != null) {
            // If there is no match set bool to false
            if (!(character == word[i])) {
                backwardsMatch = false;
            }
        }
        // If undefined then there is no match
        else {
            backwardsMatch = false;
        }        
    }

    // Check for matches and if yes add count to horizontalMatches
    if (forwardMatch) {
        horizontalMatches++;
    }
    if (backwardsMatch) {
        horizontalMatches++;
    }

    return horizontalMatches;
}

// Check for vertical matches
function verticalMatch(word, data, linePos, characterPos) {
    // Initialize variables
    let verticalMatches = 0;
    let aboveMatch = true;
    let belowMatch = true;

    // First check if there is a match above
    for (let i = 1; i < word.length; i++) {
        let line = data[linePos - i];

        // Check if line is defined
        if (line != null) {
            let character = line[characterPos];

            // If there is no match set bool to false
            if (!(character == word[i])) {
                aboveMatch = false;
            }

        }
        // If line is undefined then there is no match
        else {
            aboveMatch = false;
        }
    }

    // Now check for a match below
    for (let i = 1; i < word.length; i++) {
        let line = data[linePos + i];

        // Check if line is defined
        if (line != null) {
            let character = line[characterPos];

            // If there is no match set bool to false
            if (!(character == word[i])) {
                belowMatch = false;
            }

        }
        // If line is undefined then there is no match
        else {
            belowMatch = false;
        }
    }

    // Check for matches and if so add count to verticalMatches
    if (aboveMatch) {
        verticalMatches++;
    }
    if (belowMatch) {
        verticalMatches++;
    }

    return verticalMatches;
}

// Check for diagonal matches
function diagonalMatch(word, data, linePos, characterPos) {
    // Initialize variables
    let diagonalMatches = 0;
    let leftAboveMatch = true;
    let rightAboveMatch = true;
    let leftBelowMatch = true;
    let rightBelowMatch = true;

    // First check if there is a match diagonally up to the left
    for (let i = 0; i < word.length; i++) {
        let line = data[linePos - i];

        // Check if line is defined
        if (line != null) {
            let character = line[characterPos - i];

            // Check if character is defined
            if (character != null) {
                // If there is no match set bool to false
                if (!(character == word[i])) {
                    leftAboveMatch = false;
                }
            }
            // If character is not defined then there is no match
            else {
                leftAboveMatch = false;
            }
        }
        // If line is not defined then there is no match
        else {
            leftAboveMatch = false;
        }
    }

    // Secondly check if there is a match diagonally up to the right
    for (let i = 0; i < word.length; i++) {
        let line = data[linePos - i];

        // Check if line is defined
        if (line != null) {
            let character = line[characterPos + i];

            // Check if character is defined
            if (character != null) {
                // If there is no match set bool to false
                if (!(character == word[i])) {
                    rightAboveMatch = false;
                }
            }
            // If character is not defined then there is no match
            else {
                rightAboveMatch = false;
            }
        }
        // If line is not defined then there is no match
        else {
            rightAboveMatch = false;
        }
    }

    // Thirdly check if there is a match diagonally down to the left
    for (let i = 0; i < word.length; i++) {
        let line = data[linePos + i];

        // Check if line is defined
        if (line != null) {
            let character = line[characterPos - i];

            // Check if character is defined
            if (character != null) {
                // If there is no match set bool to false
                if (!(character == word[i])) {
                    leftBelowMatch = false;
                }
            }
            // If character is not defined then there is no match
            else {
                leftBelowMatch = false;
            }
        }
        // If line is not defined then there is no match
        else {
            leftBelowMatch = false;
        }
    }

    // And finally check if there is a match diagonally down to the right
    for (let i = 0; i < word.length; i++) {
        let line = data[linePos + i];

        // Check if line is defined
        if (line != null) {
            let character = line[characterPos + i];

            // Check if character is defined
            if (character != null) {
                // If there is no match set bool to false
                if (!(character == word[i])) {
                    rightBelowMatch = false;
                }
            }
            // If character is not defined then there is no match
            else {
                rightBelowMatch = false;
            }
        }
        // If line is not defined then there is no match
        else {
            rightBelowMatch = false;
        }
    }

    // Check for matches and if so count to diagonalMatches
    if (leftAboveMatch) {
        diagonalMatches++;
    }
    if (rightAboveMatch) {
        diagonalMatches++;
    }
    if (leftBelowMatch) {
        diagonalMatches++;
    }
    if (rightBelowMatch) {
        diagonalMatches++;
    }

    return diagonalMatches;
}

// Check if the first diagonal has an MAS
function firstDiagonalMatch(data, linePos, characterPos) {
    // Initialize variables
    let m = false;
    let s = false;

    // Check if the upper left position contains an M or S
    let lineAbove = data[linePos - 1];

    // Check if line is defined
    if (lineAbove != null) {
        let character = lineAbove[characterPos - 1];

        // Check if character is defined
        if (character != null) {
            // Check if character matches A or M
            if (character == 'M') {
                m = true;
            }
            else if (character == 'S') {
                s = true;
            }
        }
    }

    // Now check if the lower right position contains an M or S
    let lineBelow = data[linePos + 1];

    // Check if line is defined
    if (lineBelow != null) {
        let character = lineBelow[characterPos + 1];

        // Check if character is defined
        if (character != null) {
            // Check if character matches A or M
            if (character == 'M') {
                m = true;
            }
            else if (character == 'S') {
                s = true;
            }
        }
    }

    // If both S and M are in the diagonal then there must be a MAS
    if (m && s) {
        return true;
    }
    else {
        return false;
    }
}

// Check if the second diagonal has an MAS
function secondDiagonalMatch(data, linePos, characterPos) {
    // Initialize variables
    let m = false;
    let s = false;

    // Check if the upper right position contains an M or S
    let lineAbove = data[linePos - 1];

    // Check if line is defined
    if (lineAbove != null) {
        let character = lineAbove[characterPos + 1];

        // Check if character is defined
        if (character != null) {
            // Check if character matches A or M
            if (character == 'M') {
                m = true;
            }
            else if (character == 'S') {
                s = true;
            }
        }
    }

    // Now check if the lower left position contains an M or S
    let lineBelow = data[linePos + 1];

    // Check if line is defined
    if (lineBelow != null) {
        let character = lineBelow[characterPos - 1];

        // Check if character is defined
        if (character != null) {
            // Check if character matches A or M
            if (character == 'M') {
                m = true;
            }
            else if (character == 'S') {
                s = true;
            }
        }
    }

    // If both S and M are in the diagonal then there must be a MAS
    if (m && s) {
        return true;
    }
    else {
        return false;
    }
}