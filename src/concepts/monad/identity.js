/**
 * Creates an Identity monad that wraps a value and provides methods for
 * transforming and chaining computations while preserving the monadic wrapper.
 *
 * `flatMap`: Applies a function to the wrapped value and returns the result
 * without wrapping. `flatMap` does not wrap the returned value, allowing
 * functions that return monads themselves to be composed without creating
 * nested monads.
 *
 * `map`: Applies a function to the wrapped value and returns a new monad
 * containing the transformed result. The result of `fn(val)` is automatically
 * wrapped using `Identity.of`.
 *
 * `toString()`: Returns a string representation of the monad.
 */
export const Identity = (value) => ({
  flatMap: (fn) => fn(value),

  map(fn) {
    return Identity.of(fn(value))
  },

  toString: () => `Identity(${value})`,
})

Identity.of = (x) => Identity(x)

// `map`: value -> Monad(value)
// `flatMap`: value -> value

// `map` = `flatMap` + `of`
