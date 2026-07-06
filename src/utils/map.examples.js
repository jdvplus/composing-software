import { map } from './map.js'

const log = (...args) => console.log(...args)

const arr = [1, 2, 3, 4]
const isEven = (n) => n % 2 === 0

const stripe = (n) => (isEven(n) ? 'dark' : 'light')
const stripeAll = map(stripe)
const striped = stripeAll(arr)
log(striped) // ['light', 'dark', 'light', 'dark']

/*
What's happening:

  `stripeAll`:
    `fn`: stripe
    returns (arr) => arr.map(stripe)

  `striped`: (arr) => arr.map(stripe)
    [1, 2, 3, 4].map((n) => isEven(n) ? 'dark' : 'light')
*/

const double = (n) => n * 2
const doubleAll = map(double)
const doubled = doubleAll(arr)
log(doubled) // [2, 4, 6, 8]
