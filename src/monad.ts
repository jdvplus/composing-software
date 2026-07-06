/**
 * A monad is a pattern of composing functions that require context in addition
 * to the return value, such as computation, branching, or effects. Monads map
 * and flatten so that the types line up for type lifting functions, making them
 * composable.
 *
 * Given `a -> f -> M(b)` and `b -> g -> M(c)`, monads let us compose them to
 * produce `h: a -> g◦f -> M(c)`.
 *
 * `FlatMap` is the operation that defines a monad. It combines map and flatten
 * into a single operation used to compose type lifting functions (a => M(b)).
 */

/**
 * Takes a length, and returns a function which takes a value. The returned
 * function then returns an array of length `n`, filled with `x`.
 */
const echo = (n: number) => (x: unknown) => Array.from({ length: n }).fill(x)

console.log([1, 2, 3].map(echo(3))) // [ [1, 1, 1], [2, 2, 2], [3, 3, 3] ]
console.log([1, 2, 3].flatMap(echo(3))) // [1, 1, 1, 2, 2, 2, 3, 3, 3]

// ----------------------------------------------------------------------------

import { compose } from './utils/compose.js'
import { trace } from './utils/trace.js'

type User = { name: string; role: string }
type GetUserById = (id: number) => Promise<User | undefined>
type HasPermission = (user: User) => Promise<boolean>

// a => Promise(b)
const getUserById: GetUserById = (id) =>
  id === 3
    ? Promise.resolve({ name: 'John', role: 'Author' })
    : Promise.resolve(undefined)

// b => Promise(c)
const hasPermission: HasPermission = ({ role }) =>
  Promise.resolve(role === 'Author')

let authUser = compose(hasPermission, getUserById)
authUser(3).then(trace('API call composition')) // false (not true, as expected)
// fails because `hasPermission` expects a `User` but receives a Promise<User>

/**
 * Takes the name of a monad's chaining method (`then`, `chain`, `flatMap`,
 * etc.) and returns a function that accepts an arbitrary number of monadic
 * functions.
 *
 * These monadic functions are composed by reducing over the array without an
 * explicit initial accumulator, so the first function becomes the accumulator
 * (`acc`) and the second function becomes the current value (`curr`).
 *
 * On each iteration, the reducer returns a new function that takes a value `x`,
 * invokes `curr(x)` to produce a monad, and then invokes the specified chaining
 * method on that monad, passing `acc` as the callback:
 *
 * Ex: `curr(x).then(acc)` or `curr(x).flatMap(acc)`, etc.
 *
 * The newly created composed function becomes the accumulator for the next
 * iteration. After `.reduce()` completes, the final composed monadic function
 * is returned.
 */
const composeMonads =
  (flatMap: string) =>
  (...monads: any) =>
    monads.reduce((f: any, g: any) => (x: any) => g(x)[flatMap](f))

const composePromises = composeMonads('then')
authUser = composePromises(hasPermission, getUserById)
authUser(3).then(trace('API call composition')) // true

/*
What's happening in the example above:

composeMonads('then')
  
  `flatMap`: 'then'
  return (...monads) => ...

  composePromises(hasPermission, getUserById)

    `monads`: [hasPermission, getUserById]
    return monads.reduce(...) => ...

    reduce callbackFn

      `f`: hasPermission
      `g`: getUserById
      return (x) => ...

      authUser(3)

        `x`: 3
        return getUserById(3)['then'](hasPermission) => `true`
*/
