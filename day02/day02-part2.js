const fs = require('fs')

const strategyGuide = {
    // Rock
    "A": {
        winningAnswer: "B",
        drawAnswer: "A",
        loseAnswer: "C",
    },
    // Paper
    "B": {
        winningAnswer: "C",
        drawAnswer: "B",
        loseAnswer: "A",
    },
    // Scissors
    "C": {
        winningAnswer: "A",
        drawAnswer: "C",
        loseAnswer: "B",
    },
};

const expectedResult = {
    "Y": {
        answer: "drawAnswer",
        points: 3,
    },
    "Z": { 
        answer: "winningAnswer", 
        points: 6,
    },
    "X": { 
        answer: "loseAnswer", 
        points: 0,
    }
}

const pointsSystem = {
    "A": 1,
    "B": 2,
    "C": 3
}

const data = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => {
        const [opponentChoice, gameResult] = row.split(" ");

        const calculateResult = () => {

            const resultPoints = expectedResult[gameResult].points;
            const object = strategyGuide[opponentChoice][`${expectedResult[gameResult].answer}`];
            const objectPoints = pointsSystem[object];

            
            return resultPoints + objectPoints;
        }
        return calculateResult();
    });

console.log("Value of Data: ", data.reduce((acc, currVal) => acc + currVal, 0));