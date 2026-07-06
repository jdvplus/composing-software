import { compose } from './compose.js'

const g = (n) => n + 1
const f = (n) => n * 2

// we can replace `(x) => f(g(x))` with `compose(f, g)`
const h = compose(f, g)
console.log(h(20)) // 42
