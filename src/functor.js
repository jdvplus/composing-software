/**
 * A functor is a mapping between categories. Functors must respect identity and
 * composition. The functor laws are the axioms that ensure that identity and
 * composition are respected.
 */

// Functors must obey the identity law:
// For any functor type `a`, a.map((x) => x) should be equivalent to `a`.
const identityFn = (x) => x
let a = [20]
let b = a.map(identityFn)
console.log(a.toString() === b.toString()) // true

// Functors must obey the composition law:
// For any functor type `a`,
// a.map(g).map(f) should be equivalent to a.map((x) => f(g(x))).
const g = (n) => n + 1
const f = (n) => n * 2
const mappable = [20]
a = mappable.map(g).map(f)
b = mappable.map((x) => f(g(x)))
console.log(a.toString() === b.toString()) // true

// ----------------------------------------------------------------------------

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
const Identity = (value) => ({
  map: (fn) => Identity(fn(value)),
})

const print = (x) => console.log(x)

// identity law
const identity_two = Identity(2) // `value` === 2
const r1 = identity_two
r1.map(print) // 2 (`value` === undefined)
const r2 = identity_two.map(identityFn) // `value` === 2
r2.map(print) // 2 (`value` === undefined)

// composition law
const r3 = identity_two.map((x) => f(g(x)))
const r4 = identity_two.map(g).map(f)
r3.map(print) // 6 (2 -> 3 -> 6)
r4.map(print) // 6 (2 -> 3 -> 6)

// curried map: a generic map that works with any functor
import { curry } from './utils/curry.js'
const map = curry((fn, arr) => arr.map(fn))

const double = (n) => n * 2
const m_double = map(double)

m_double(Identity(4)).map(print) // 8
m_double([4, 8, 12]).map(print) // 8, 16, 24
