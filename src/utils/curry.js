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
export const curry = (fn, arr = []) => {
  return (...args) => {
    const allArgs = [...arr, ...args]

    if (allArgs.length >= fn.length) return fn(...allArgs)
    return curry(fn, allArgs)
  }
}
