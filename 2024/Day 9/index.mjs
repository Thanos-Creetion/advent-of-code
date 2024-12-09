import { readFileSync } from "fs";

// Set up data
let data = readFileSync('2024/Day 9/data.txt').toString();
let diskMap = [];
let disk = [];
let result = 0;

// Split the data into an disk map of files and free spaces
for (let i = 1; i < data.length + 1; i++) {
    let character = parseInt(data[i - 1]);
    
    // Check if character is a file or an empty space
    if (i % 2 != 0) {
        diskMap.push([Math.round(i / 2) - 1, character]);
    }
    else {
        diskMap.push([-1, character]);
    }
}

// Sort the disk map to remove gaps of empty files
sortMap(diskMap);

// Convert the disk map into an representation of the disk in one array
convert(diskMap, disk);

// Calculate the checksum
result = calc(disk);

// Log the result
console.log(result);



// Today's functions

// Add the value to the array for n times
function add (array, value, n) {
    for (let i = 0; i < n; i++) {
        array.push(value);
    }
}

// Convert the disk map into a disk representation
function convert(diskMap, disk) {
    for (let i = 0; i < diskMap.length; i++) {
        let block = diskMap[i];
        
        // Check if the block is not empty space
        if (block[0] != -1) {
            add(disk, block[0], block[1]);
        }
        else {
            add(disk, block[0], block[1]);
        }
    }
}

// Sort the disk representation block by block
function sort(disk) {
    for (let i = 0; i < disk.length; i++) {
        let block = disk[i];
    
        // Check if the current block is empty space
        if (block == -1) {
            let j = disk.length;
            let index = -1;
    
            // Find the index of the replacing block
            while (j >= 0 && index == -1 && j > i) {
                j--;
    
                if (disk[j] != -1) {
                    index = j;
                }
            }
    
            // Exchange current block and the new block and check if index is not null
            if (index != -1) {
                disk[i] = disk[index];
                disk[index] = -1;
            }
        }
    }
}

// Sort the disk map by file
function sortMap(diskMap) {
    for (let i = diskMap.length - 1; i >= 0; i--) {
        let block = diskMap[i];

        // Check if the block is a file
        if (block[0] != -1) {
            let j = 0;
            let index = -1;

            // Find the index of the empty space to replace start from the beginning of the array
            while (j < i && index == -1) {
                if (diskMap[j][0] == -1 && diskMap[j][1] >= block[1]) {
                    index = j;
                }
                
                j++;
            }

            // Move the file into the empty space
            if (index != -1) {
                // First check if file and empty space are the same size, if so, switch them
                if (diskMap[index][1] == block[1]) {
                    diskMap[i] = diskMap[index];
                    diskMap[index] = block;
                }
                // Otherwise, leave the extra empty space after the file
                else {
                    diskMap[i] = [-1, block[1]];

                    // Get the extra empty space
                    let extra = diskMap[index][1] - block[1];
                    diskMap[index] = block;
                    diskMap.splice(index + 1, 0, [-1, extra]);
                    i++;
                }
            }
        }
    }
}

// Calculate the checksum
function calc(disk) {
    let result = 0;

    for (let i = 0; i < disk.length; i++) {
        let block = disk[i];
        
        if (block != -1) {
            result += i * block;
        }
    }

    return result;
}