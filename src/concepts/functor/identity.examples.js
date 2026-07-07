import { Identity as IdentityFunctor, identityFn } from './identity.js'

const print = (x) => console.log(x)
const g = (n) => n + 1
const f = (n) => n * 2

// identity law
const id = IdentityFunctor(2) // `value` === 2
const r1 = id
r1.map(print) // 2
// `print` returns undefined, so the next Identity wraps a `value` of undefined
const r2 = id.map(identityFn) // `value` === 2
r2.map(print) // 2 (Identity(undefined) => `value` === undefined)

// composition law
const r3 = id.map((x) => f(g(x)))
const r4 = id.map(g).map(f)
r3.map(print) // 6 (2 -> 3 -> 6)
r4.map(print) // 6 (2 -> 3 -> 6)
