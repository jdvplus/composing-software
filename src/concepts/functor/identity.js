/** Takes a value and returns the value. */
export const identityFn = (x) => x

/**
 * Takes a value, and returns an object with a `map` method. The `map` method
 * takes a function and returns the result of applying the function to the value
 * inside the next Identity.
 *
 * `value` is closed over and persists over function calls.
 *
 * Note: `Identity` does _not_ infinitely recurse, because the function is only
 * invoked when `Identity.map()` is invoked - not when the object is first
 * created.
 */
export const Identity = (value) => ({
  map: (fn) => Identity(fn(value)),
})
