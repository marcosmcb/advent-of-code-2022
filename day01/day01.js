const fs = require('fs')

const elfs = [];
let totalElf = 0;
elfs["0"] = 0

fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .forEach(row => {
        const calories = row.trim();

        if (calories.length === 0) {
            totalElf++;
            elfs[`${totalElf}`] = 0;
        } else {
            elfs[`${totalElf}`] = elfs[`${totalElf}`] + Number(calories);
        }
    });

console.log("Max Value: ", Math.max(...Object.values(elfs)));

const [first, second, third] = Object.values(elfs).sort((a, b) => b - a);

console.log("Sum of Top 3 Elfs: ", first + second + third);