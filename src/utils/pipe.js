/**
 * Takes any number of functions, and returns a function which takes an initial
 * value `x` and uses `reduce()` to iterate L-R over every function `f` in `fns`
 * and apply it to the accumulated value `y`.
 *
 * Essentially, composes in reverse order.
 */
export const pipe = (...fns) => {
  return (x) => fns.reduce((y, f) => f(y), x)
}
