/**
 * A functor data type is a container with a map operation, which can be used to
 * apply a function to the values inside of it.
 *
 * In JS, functor types are typically represented as an object with a .map()
 * method that maps from inputs to outputs, e.g., Array.prototype.map().
 *
 * A functor is a mapping between categories. Functors must respect identity and
 * composition. The functor laws are the axioms that ensure that identity and
 * composition are respected.
 */

// Functors must obey the identity law:
// For any functor type `a`, a.map((x) => x) should be equivalent to `a`.
import { identityFn } from './identity.js'
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
