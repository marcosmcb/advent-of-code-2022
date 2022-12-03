const fs = require('fs')

const calculatePriorityValue = (item) => {
    const charCode = item.charCodeAt(0);
    // lowerCase
    if (charCode > 96) return charCode - 96;
    // uppserCase
    return charCode - 64 + 26;
}


const rucksacks = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => {
        const firstRucksack = row.substring(0, row.length/2);
        const secondRucksack = new Set(row.substring(row.length/2));

        const [ commonItem ] = firstRucksack.split("").filter(item => secondRucksack.has(item));
        
        return calculatePriorityValue(commonItem);
    })
    .reduce((acc, currVal) => acc + currVal, 0)

console.log("Result: ", rucksacks);