const fs = require('fs');

const treeGrid = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => row.split("").map(Number));

const getMatrixIndexes = (matrix) => {
    return {
        colIndexes: Array.from(Array(matrix[0].length).keys()),
        rowIndexes: Array.from(Array(matrix.length).keys())
    }
}

const { colIndexes, rowIndexes } = getMatrixIndexes(treeGrid);

const isEdge = (idxRow, idxCol) => {
    const isFirstRowOrFirstColumn = idxRow === 0 || idxCol === 0;
    const isLastRowOrLastColumn = idxRow === rowIndexes.length - 1 || idxCol === colIndexes.length - 1;

    return isFirstRowOrFirstColumn || isLastRowOrLastColumn;
}

const isTallerThanTopTrees = (i, j, treeHeight) => {
    const topTrees = [];
    for (let x = 0; x < i; x++) topTrees.push(treeGrid[x][j]);
    return topTrees.filter(tree => treeHeight > tree).length === topTrees.length;
}

const isTallerThanBottomTrees = (i, j, treeHeight) => {
    const bottomTrees = [];
    for (let x = i + 1; x < rowIndexes.length; x++) bottomTrees.push(treeGrid[x][j]);
    return bottomTrees.filter(tree => treeHeight > tree).length === bottomTrees.length;
}

const isTallerThanLeftTrees = (i, j, treeHeight) => {
    const leftTrees = [];
    for (let x = 0; x < j; x++) leftTrees.push(treeGrid[i][x]);
    return leftTrees.filter(tree => treeHeight > tree).length === leftTrees.length;
}

const isTallerThanRightTrees = (i, j, treeHeight) => {
    const rightTrees = [];
    for (let x = j + 1; x < colIndexes.length; x++) rightTrees.push(treeGrid[i][x]);
    return rightTrees.filter(tree => treeHeight > tree).length === rightTrees.length;
}

const getVisibleTopTrees = (i, j, treeHeight) => {
    let visibleTrees = 0;
    for (let x = i-1; x >= 0; x--) {
        if ( treeHeight > treeGrid[x][j] ) {
            visibleTrees++;
        } else if (treeHeight === treeGrid[x][j]) {
            visibleTrees++;
            break;
        } else {
            break;
        }
    }
    return visibleTrees;
}

const getVisibleBottomTrees = (i, j, treeHeight) => {
    let visibleTrees = 0;
    
    for (let x = i + 1; x < rowIndexes.length; x++) {
        if ( treeHeight > treeGrid[x][j] ) {
            visibleTrees++;
        } else if (treeHeight === treeGrid[x][j]) {
            visibleTrees++;
            break;
        } else {
            break;
        }
    }
    return visibleTrees;
}

const getVisibleLeftTrees = (i, j, treeHeight) => {
    let visibleTrees = 0;

    for (let x = j - 1; x >= 0; x--) {
        if ( treeHeight > treeGrid[i][x] ) {
            visibleTrees++;
        } else if (treeHeight === treeGrid[i][x]) {
            visibleTrees++;
            break;
        } else {
            break;
        }
    }
    return visibleTrees;
}

const getVisibleRightTrees = (i, j, treeHeight) => {
    let visibleTrees = 0;
    for (let x = j + 1; x < colIndexes.length; x++) {
        if ( treeHeight > treeGrid[i][x] ) {
            visibleTrees++;
        } else if (treeHeight === treeGrid[i][x]) {
            visibleTrees++;
            break;
        } else {
            visibleTrees++;
            break;
        }
    }
    return visibleTrees;
}

const edges = [];
const insideTrees = [];
const scenicScores = [];
for (let i = 0; i < rowIndexes.length; i++) {
    for (let j = 0; j < colIndexes.length; j++) {
        const treeHeight = treeGrid[i][j];

        if (isEdge(i, j)) {
            edges.push(treeHeight);
            continue;
        }

        const isVisible = isTallerThanTopTrees(i, j, treeHeight) || isTallerThanBottomTrees(i, j, treeHeight) ||
            isTallerThanLeftTrees(i, j, treeHeight) || isTallerThanRightTrees(i, j, treeHeight);

        if (isVisible) {
            insideTrees.push(treeHeight);
        }

        const topScore = getVisibleTopTrees(i, j, treeHeight);
        const bottomScore = getVisibleBottomTrees(i, j, treeHeight);
        const leftScore = getVisibleLeftTrees(i, j, treeHeight);
        const rightScore = getVisibleRightTrees(i, j, treeHeight);
        const scenicScore = topScore * bottomScore * leftScore * rightScore;

        
        scenicScores.push(scenicScore);
    }
}

// console.log("Result: ", treeGrid);
// console.log("Edge: ", edges, " Length: ", edges.length);
// console.log("Inside: ", insideTrees, " Length: ", insideTrees.length);


console.log("Part 1 Answer: ", insideTrees.length + edges.length);
console.log("Part 2 Answer: ", Math.max(...scenicScores));