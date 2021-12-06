const initialFishes = [3, 3, 2, 1, 4, 1, 1, 2, 3, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 5, 2, 1, 1, 2, 1, 1, 1, 3,
                       5, 1, 5, 5, 1, 1, 1, 1, 3, 1, 1, 3, 2, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 4, 1, 3, 3, 1,
                       1, 3, 1, 3, 1, 2, 1, 3, 1, 1, 4, 1, 2, 4, 4, 5, 1, 1, 1, 1, 1, 1, 4, 1, 5, 1, 1, 5, 1, 1, 3, 3,
                       1, 3, 2, 5, 2, 4, 1, 4, 1, 2, 4, 5, 1, 1, 5, 1, 1, 1, 4, 1, 1, 5, 2, 1, 1, 5, 1, 1, 1, 5, 1, 1,
                       1, 1, 1, 3, 1, 5, 3, 2, 1, 1, 2, 2, 1, 2, 1, 1, 5, 1, 1, 4, 5, 1, 4, 3, 1, 1, 1, 1, 1, 1, 5, 1,
                       1, 1, 5, 2, 1, 1, 1, 5, 1, 1, 1, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 4, 4, 1, 4, 1, 1, 5, 3,
                       1, 1, 1, 5, 2, 2, 4, 2, 1, 1, 3, 1, 5, 5, 1, 1, 1, 4, 1, 5, 1, 1, 1, 4, 3, 3, 3, 1, 3, 1, 5, 1,
                       4, 2, 1, 1, 5, 1, 1, 1, 5, 5, 1, 1, 2, 1, 1, 1, 3, 1, 1, 1, 2, 3, 1, 2, 2, 3, 1, 3, 1, 1, 4, 1,
                       1, 2, 1, 1, 1, 1, 3, 5, 1, 1, 2, 1, 1, 1, 4, 1, 1, 1, 1, 1, 2, 4, 1, 1, 5, 3, 1, 1, 1, 2, 2, 2,
                       1, 5, 1, 3, 5, 3, 1, 1, 4, 1, 1, 4];
const iterations = 256;
const fishTimer = 6;

// Put each fish into a pool matching his timer (0-8)
const fishPools = initialFishes.reduce((fishes, fish) => {
  fishes[fish]++;
  return fishes;
}, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

// Shift all fish timers by 1, add the shifted value to the 6th and 8th pool
for (let i = 0; i < iterations; i++) {
  const addFishes = fishPools.shift();

  fishPools[fishTimer] += addFishes;
  fishPools.push(addFishes);
}

console.log(
  `Number of fishes after ${iterations} days: ${fishPools.reduce((allFishes, fishes) => allFishes + fishes, 0)}`,
  fishPools);

