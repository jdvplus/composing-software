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
const echo = (n) => (x) => Array.from({ length: n }).fill(x)

console.log([1, 2, 3].map(echo(3))) // [ [1, 1, 1], [2, 2, 2], [3, 3, 3] ]
console.log([1, 2, 3].flatMap(echo(3))) // [1, 1, 1, 2, 2, 2, 3, 3, 3]
