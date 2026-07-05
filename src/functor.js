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
 * inside the Identity.
 */
const Identity = (value) => ({
  map: (fn) => Identity(fn(value)),
})

const print = (x) => console.log(x)

// identity law
const identity = Identity(2)
const r1 = identity
const r2 = identity.map(identityFn)
r1.map(print) // 2
r2.map(print) // 2

// composition law
const r3 = identity.map((x) => f(g(x)))
const r4 = identity.map(g).map(f)
r3.map(print) // 6 (2 -> 3 -> 6)
r4.map(print) // 6 (2 -> 3 -> 6)
