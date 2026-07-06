/**
 * Takes any number of functions, and returns a function which takes an initial
 * value `x` and uses `reduceRight()` to iterate R-L over every function `f` in
 * `fns` and apply it to the accumulated value `y`.
 */
export const compose = (...fns) => {
  return (x) => fns.reduceRight((y, f) => f(y), x)
}
