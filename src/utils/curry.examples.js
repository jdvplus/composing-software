import { curry } from './curry.js'

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
/*
const notEnoughArguments = add3(1, 2)
console.log(notEnoughArguments) // returns the returned function's definition

const tooManyArguments = add3(1, 2, 3)(4) // throws
*/
