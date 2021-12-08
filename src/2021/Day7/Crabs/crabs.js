const fs = require('fs');
const crabPositions = JSON.parse(fs.readFileSync('./input').toString());
console.log("Positions", crabPositions);