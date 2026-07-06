/**
 * Takes a function, and returns a function which takes an array and returns the
 * result of mapping over the array passing in the initial function as a
 * callback.
 */
export const map = (fn) => (arr) => arr.map(fn)
