const fs = require('fs')

const strategyGuide = {
    "A": {
      winningAnswer: "Y",
      drawAnswer: "X",
    },
    "B": {
        winningAnswer: "Z",
        drawAnswer: "Y",
    },
    "C": {
        winningAnswer: "X",
        drawAnswer: "Z",
    },
};

const pointsSystem = {
    "X": 1,
    "Y": 2,
    "Z": 3
}

const data = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => {
        const [opponentChoice, myChoice] = row.split(" ");

        const calculateResult = () => {
            const isWinningAnswer = strategyGuide[opponentChoice].winningAnswer === myChoice;
            const isDrawAnswer = strategyGuide[opponentChoice].drawAnswer === myChoice;
            if (isWinningAnswer) return 6;
            if (isDrawAnswer) return 3;
            return 0;
        } 
        const score = pointsSystem[myChoice] + calculateResult();
        return score;
    });

console.log("Value of Data: ", data.reduce((acc, currVal) => acc+currVal, 0));