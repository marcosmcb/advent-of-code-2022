const fs = require('fs')


const isFullyContained = (firstElf, secondElf) => {

    const isFirstSectionInSecondSection = firstElf.begin >= secondElf.begin && firstElf.begin <= secondElf.end;
    const secondElfContainsFirst = firstElf.end >= secondElf.begin && firstElf.end <= secondElf.end;

     
    const secondElfBegin = secondElf.begin >= firstElf.begin && secondElf.begin <= firstElf.end;
    const secondElfEnd = secondElf.end >= firstElf.begin && secondElf.end <= firstElf.end;

    const result2 = secondElfBegin || secondElfEnd;

    return isFirstSectionInSecondSection || secondElfContainsFirst || result2;
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