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
export const composeMonads = (method) => {
  return (...monads) =>
    monads.reduce((f, g) => {
      return (x) => g(x)[method](f)
    })
}

// ----------------------------------------------------------------------------

/**
 * Since `composeMonads` is a reusable higher-order function, we can create
 * specialized implementations based on the chaining method we want to use.
 */

const composePromises = composeMonads('then')
const composeMap = composeMonads('map')
const composeFlatMap = composeMonads('flatMap')
