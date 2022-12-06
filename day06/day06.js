const fs = require('fs');

const [ datastream ] = fs
    .readFileSync('input.txt', 'utf8')
    .split("\n")
    .map(row => row);


const DISTINCT_CHARACTERS = 14
const isOutOfBounds = (strLength, index) => index > strLength;

for(let i=0; i < datastream.length; i++) {
    
    if (isOutOfBounds(datastream.length, i+DISTINCT_CHARACTERS)) continue;
    
    const marker = datastream.slice(i, i+DISTINCT_CHARACTERS);
    const markerSet = new Set(marker.split(""));

    if (markerSet.size === DISTINCT_CHARACTERS) {
        console.log("Final Marker is: ", i+DISTINCT_CHARACTERS);
        break;
    }
}