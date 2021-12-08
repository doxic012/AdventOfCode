const fs = require('fs');
const {EOL} = require('os');
const _ = require('lodash');
const {permutation} = require('array-permutation');
const submarineLights = fs
  .readFileSync('./input')
  .toString().split(EOL)
  .map(line => {
    const split = line.split(" | ");
    return [split[0], split[1]];
  })
  .map(([combinations, digits]) => [combinations.split(" ").map(c => Array.from(c)),
                                    digits.split(" ").map(c => Array.from(c))])

console.log("submarineLights", submarineLights);

// Part 1
let counter = 0;
submarineLights.forEach(([combinations, digits]) => {
  //Part 1: extract unique values for 1 (2), 4 (4), 7 (3) and 8 (7)
  counter += digits
    .filter(digit => digit.length === 2 || digit.length === 4 || digit.length === 3 || digit.length === 7)
    .length;
});

console.log("Part 1:", counter);

// Part 2

//ag fbagcd fgda dacgb dcebaf abg bcfad efbdagc fecgba ebdcg | gab gcedfba dgecafb fabedc
// console.log(getSchema(submarineLights[131][0]));
const allNumbers = submarineLights.reduce((value, [input, output]) => {
  const schema = getSchema(input);
  const numbers = output.map(n => getNumber(n, schema));
  return Number(numbers.join("")) + value;
}, 0);
console.log("Part 2:", allNumbers);

// [1, 2, 4, 8, 6, 32, 64] bitmap flag for each letter
/*
  11111111
2          4
2          4
  88888888
16        32
16        32
  64646464
 */
// function getSchema(combinations) {
//   console.log(combinations);
//   const one = _.find(combinations, c => c.length === 2);
//   const four = _.find(combinations, c => c.length === 4);
//   const seven = _.find(combinations, c => c.length === 3);
//   const eight = _.find(combinations, c => c.length === 7);
//   const permutations = permutation(Array.from("abcdefg"))
//   for (let perm of permutations) {
//     if (getNumber(one, perm) !== 1 ||
//         getNumber(four, perm) !== 4 ||
//         getNumber(seven, perm) !== 7 ||
//         getNumber(eight, perm) !== 8 ||
//         getNumber(_.union(four, seven, perm[6]), perm) !== 9 ||
//         getNumber([perm[0], perm[1], perm[3], perm[4], perm[5], perm[6]], perm) !== 6) {
//       continue;
//     }
//     return perm;
//   }
//
//   return null;
// }

function getSchema(combinations) {
  const schema = [0, 0, 0, 0, 0, 0, 0];
  const one = _.find(combinations, c => c.length === 2);
  const four = _.find(combinations, c => c.length === 4);
  const seven = _.find(combinations, c => c.length === 3);
  const eight = _.find(combinations, c => c.length === 7);
  const nine = _.find(combinations, c => c.length === 6 && _.difference(c, _.union(four, seven)).length === 1);
  schema[0] = _.difference(seven, one)[0];
  schema[6] = _.difference(nine, _.union(four, seven))[0];
  schema[4] = _.difference(eight, nine)[0];

  const two = _.find(combinations, c => c.length === 5 &&
                                        _.difference(c, [schema[0], schema[4], schema[6]]).length === 2);
  schema[2] = _.intersection(two, one)[0];
  schema[5] = _.find(one, l => schema.indexOf(l) === -1);
  schema[3] = _.find(two, l => schema.indexOf(l) === -1);
  schema[1] = _.find(eight, l => schema.indexOf(l) === -1);
  return schema;
}

function getNumber(input, schema) {
  const number = input.reduce((value, letter) => value + Math.pow(2, schema.indexOf(letter)), 0);
  switch (number) {
    case 4 + 32:
      return 1;
    case 1 + 4 + 8 + 16 + 64:
      return 2;
    case 1 + 4 + 8 + 32 + 64:
      return 3;
    case 2 + 4 + 8 + 32:
      return 4;
    case 1 + 2 + 8 + 32 + 64:
      return 5;
    case 1 + 2 + 8 + 16 + 32 + 64:
      return 6;
    case 1 + 4 + 32:
      return 7;
    case 1 + 2 + 4 + 8 + 16 + 32 + 64:
      return 8;
    case 1 + 2 + 4 + 8 + 32 + 64:
      return 9;
    case 1 + 2 + 4 + 16 + 32 + 64:
      return 0;
  }
}