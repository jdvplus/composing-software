/**
 * Takes a function `fn` and an optional array, and returns a function which
 * takes an arbitary number of arguments.
 *
 * The returned function then combines the items in the optional array with the
 * arguments passed in into a new array, whose length is checked against the
 * number of arguments accepted by `fn`.
 *
 * If the new array's length is greater than or equal to that number, we return
 * the result of invoking `fn` passing in the new array. Otherwise, we return
 * the result of recursively invoking curry passing in `fn` and the new array.
 */
const curry = (fn, arr = []) => {
  return (...args) => {
    const allArgs = [...arr, ...args]

    if (allArgs.length >= fn.length) return fn(...allArgs)
    return curry(fn, allArgs)
  }
}

const sum = (a, b, c) => a + b + c

const add3 = curry(sum)
let total = add3(1, 2)(3)
console.log(total) // 6

/*
What's happening in `add3(1, 2)(3)`:

curry(sum)
  `fn`: sum
  `arr`: []

  return (...args) => {
    `args`: [1, 2]
    allArgs = [...[], ...[1, 2]] => [1, 2] 
    
    allArgs.length = 2
    fn.length = 3

    return curry(sum, [1, 2])

      `fn`: sum
      `arr`: [1, 2]

      return (...args) => {
        `args`: [3]
        allArgs = [...[1, 2], ...[3]] => [1, 2, 3]

        allArgs.length = 3
        fn.length = 3

        return sum(...[1, 2, 3]) => sum(1, 2, 3) => 6
      }
  }
*/

// we have flexibility in how we can pass in arguments
total = add3(1, 2, 3)
console.log(total) // 6
total = add3(1)(2, 3)
console.log(total) // 6
total = add3(1)(2)(3)
console.log(total) // 6

// what matters is that the number of total arguments matches `fn`'s length.

// extra arguments are ignored
total = add3(1, 2, 3, 4)
console.log(total) // 6

// too little + too many
const notEnoughArguments = add3(1, 2)
console.log(notEnoughArguments) // returns a function definition
const tooManyArguments = add3(1, 2, 3)(4)
console.log(tooManyArguments) // throws
