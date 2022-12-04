const fs = require('fs')


const isFullyContained = (firstElf, secondElf) => {

    const firstElfContainsSecond = firstElf.begin <= secondElf.begin && firstElf.end >= secondElf.end;
    const secondElfContainsFirst = secondElf.begin <= firstElf.begin && secondElf.end >= firstElf.end;

    return firstElfContainsSecond || secondElfContainsFirst;
}

const result = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => {
        
        const [ firstElf, secondElf ] = row.split(",").map(section => {
            const [ begin, end ] = section.split("-");
            return {
                begin: Number(begin),
                end: Number(end)
            }
        });

        return isFullyContained(firstElf, secondElf) ? 1 : 0; 
    })
    .reduce((acc, currVal) => acc + currVal, 0);

console.log("Result: ", result);