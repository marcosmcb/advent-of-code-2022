const fs = require('fs')


const rucksacks = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => row);

const calculatePriority = (item) => {
    const charCode = item.charCodeAt(0);
    // lowerCase
    if (charCode > 96) return charCode - 96;
        
    // upperCase
    return charCode - 64 + 26
}

const commonItems = []
for(let i = 0; i < rucksacks.length; i += 3) {

    const firstRucksack = rucksacks[i];
    const secondRucksack = new Set(rucksacks[i+1]);
    const thirdRucksack = new Set(rucksacks[i+2]);

    const [ commonItem ] = firstRucksack
        .split("")
        .filter(item => secondRucksack.has(item) && thirdRucksack.has(item));

    commonItems.push(calculatePriority(commonItem));
}





console.log("Result: ", commonItems.reduce((acc, currVal) => acc + currVal, 0));