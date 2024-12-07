// To log the test function
let permutations = permutator(4, 2).slice();
console.log(permutations);


// Get all possible permutations
function permutator(length, numbers) {
    // Initialize variables
    let list = [];
    let base = [];
    let max = 0;

    // Check what the max number is
    if (length == 1) {
        max = 2;
    }
    else {
        max = Math.pow(numbers, length);
    }

    // Set up the base array and copy it to the list
    for (let i = 0; i < length; i++) {
        base.push(1);
    }

    // Copy the base to the list
    list.push(base);

    // Now create all the other permutations
    permute(list, base, numbers, max);

    return list
}

// Get one permutation
function permute(list, previous, numbers, max) {
    if (list.length == max) {
        return;
    }

    // Deep copy the array
    let current = previous.slice();

    // Create the indexes
    let index = -1;
    let lastIndex = -1;

    // Find the index of the number to increase
    for (let i = 0; i < current.length; i++) {
        if (current[current.length - 1 - i] < numbers && index == -1) {
            index = current.length - 1 - i;
            lastIndex = index + 1;
        }
    }

    // Create another array and deep copy the current
    let next = [];

    // Check if the last index exists
    if (!(current[lastIndex] === undefined)) {
        // Now if the new number is equal to number set all the following numbers to one
        if (current[lastIndex] == numbers) {
            next = current.slice();
            next[index]++;

            for (let i = lastIndex; i < current.length; i++) {
                next[i] = 1;
            }

            // Set index to -1 so the functions skips to the next recursion
            index = -1;

            // Now push the next array to the list
            list.push(next);
        }
    }
    
    // Push the array to the list
    if (list.length == max) {
        return;
    }

    if (index != -1) {
        current[index]++;
        list.push(current);
    }

    // Check which array needs to used for recursion
    if ((next[0] === undefined)) {
        permute(list, current, numbers, max);
    }
    else {
        permute(list, next, numbers, max);
    }
}