import { Identity, identityFn } from './identity.js'

const print = (x) => console.log(x)
const g = (n) => n + 1
const f = (n) => n * 2

// identity law
const identity_two = Identity(2) // `value` === 2
const r1 = identity_two
r1.map(print) // 2
// `print` returns undefined, so the next Identity wraps a `value` of undefined
const r2 = identity_two.map(identityFn) // `value` === 2
r2.map(print) // 2 (Identity(undefined) => `value` === undefined)

// composition law
const r3 = identity_two.map((x) => f(g(x)))
const r4 = identity_two.map(g).map(f)
r3.map(print) // 6 (2 -> 3 -> 6)
r4.map(print) // 6 (2 -> 3 -> 6)
