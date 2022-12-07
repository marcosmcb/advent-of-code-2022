const fs = require('fs');


const directoryTree = {};
let visitedDirectories = [];

const calculateDirKeyName = () => visitedDirectories.join("-");

const applyCommands = (row) => {
    const [ _, command, dirName ] = row.split(" ");
            
    if (command === "cd" && dirName !== "..") {
        visitedDirectories.push(dirName);
        const directoryKey = calculateDirKeyName();
        if (!(directoryKey in directoryTree)) {
            directoryTree[directoryKey] = [];
        }
    } else if (dirName === "..") {
        visitedDirectories.pop();
    } else if (command === "ls") {
        return;
    }
}

const addDirectoryToTree = (row) => {
    const [ _, dirName ] = row.split(" ");

    const directoryKey = calculateDirKeyName();
    directoryTree[directoryKey].push(dirName);
}

const addFileToTree = (row) => {
    const [ size, filename ] = row.split(" ");

    const directoryKey = calculateDirKeyName();
    directoryTree[directoryKey].push({
        size: Number(size),
        filename
    });
}


fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .forEach(row => {
        const isCommand = row.startsWith("$");

        if (isCommand) {
            applyCommands(row);
        } else if (row.startsWith("dir")) {
            addDirectoryToTree(row);
        } else {
            addFileToTree(row);
        }
    });


const sortDirectoryNamesInTree = (directoryTree) => {
    const directoriesDesc = Object.keys(directoryTree).sort((a, b) => b.length - a.length).reduce(
        (obj, key) => { 
          obj[key] = directoryTree[key]; 
          return obj;
        }, 
        {}
    );

    return directoriesDesc;
}


const buildDirectorySizeMap = () => {
    const orderedDirectoryTree = sortDirectoryNamesInTree(directoryTree);
    
    const sizeMap = {}
    Object
        .keys(orderedDirectoryTree)
        .map(key => {
            sizeMap[key] = orderedDirectoryTree[key]
                .map(el => {
                    if (typeof el === "string") return sizeMap[key + "-" + el];
                    return el.size;
                })
                .reduce((acc, currVal) => acc+currVal, 0);
        })

    return sizeMap;
}


const MAX_DIR_SIZE = 100000;

const sizeMap = buildDirectorySizeMap();

const sumOfDirs = Object
    .values(sizeMap)
    .filter(el => el <= MAX_DIR_SIZE)
    .reduce((acc, currVal) => acc+currVal, 0);

console.log(`PART 1: Result of max directory size of ${MAX_DIR_SIZE}:`, sumOfDirs);



const TOTAL_DISK_SPACE = 70000000;
const UNUSED_DISK_SPACE = 30000000;
const outerMostDirectorySize = sizeMap["/"];

const neededSpace = UNUSED_DISK_SPACE - (TOTAL_DISK_SPACE - outerMostDirectorySize)

const directoriesSize = Object.values(sizeMap).filter(size => size > neededSpace);

const candidate = Math.min(...directoriesSize);

console.log("Candidate for Deletion", candidate);