/**
 * Takes any number of functions, and returns a function which takes an initial
 * value `x` and uses `reduceRight()` to iterate R-L over every function `f` in
 * `fns` and apply it to the accumulated value `y`.
 */
export const compose = (...fns) => {
  return (x) => fns.reduceRight((y, f) => f(y), x)
}

const g = (n) => n + 1
const f = (n) => n * 2

// we can replace `(x) => f(g(x))` with `compose(f, g)`
const h = compose(f, g)
// console.log(h(20)) // 42
