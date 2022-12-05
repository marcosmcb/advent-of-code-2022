const fs = require('fs')

const getTokensFromRow = (row) => {
    const SINGLE_SPACE = " ";
    const DOUBLE_SPACE = "  ";
    const TRIPLE_SPACE = "   ";

    const tokens = row.split(TRIPLE_SPACE);

    return tokens
    .map(token => {
        if (token.startsWith(DOUBLE_SPACE))
            return [" ", ...token.trim().split(SINGLE_SPACE)];
        else
            return token.trim().split(SINGLE_SPACE);
    })
    .flat();
}

const stacks = {};

const processCrates = (tokens) => {
    console.log("Token Value: ", tokens);
    tokens
        .forEach((token, idx) => {
            if (!token.startsWith("[")) return;

            const key = `${idx+1}`;
            if (!(key in stacks)) {
                stacks[key] = [];
            }

            stacks[key].push(token.replace("[", "").replace("]", ""));
        });
}

const instructions = [];
const processInstructions = (tokens) => {

    const [ move, moveNum, from, fromNum, to, toNum ] = tokens;

    instructions.push({
        move: Number(moveNum),
        from: Number(fromNum),
        to: Number(toNum)
    });
}

fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .forEach(row => {
        const tokens = getTokensFromRow(row);
        const [ firstToken ] = tokens;
        
        if (firstToken === "move") {
            processInstructions(tokens);
            return;
        }

        if (tokens.length > 1) {
            processCrates(tokens);
        }
    });

// Reverse stacks
Object.keys(stacks).forEach((key) => {
    stacks[key] = stacks[key].reverse();
});

console.log("Result: ", stacks);


const applyInstructionsPart1 = (stacks) => {
    instructions.map(instruction => {
        const { move, from, to } = instruction;
        for(let i=0; i < move; i++) stacks[`${to}`].push(stacks[`${from}`].pop());
    });

    return stacks;
}

const applyInstructionsPart2 = (stacks) => {
    instructions
        .map(instruction => {
            const { move, from, to } = instruction;

            stacks[`${to}`].push(...stacks[`${from}`].slice((-1*move)));

            for(let i=0; i < move; i++) stacks[`${from}`].pop();
        })
}


// applyInstructionsPart1(stacks);

applyInstructionsPart2(stacks);


const topCrates = Object.values(stacks).map(stack => stack.pop()).join("");


console.log("Top Crates: ", topCrates);