/**
 * Takes a function, and returns a function which takes a parameter `a`, and
 * returns a function which takes a parameter `b`, which returns the result of
 * executing the function returned by invoking the function passing in `b`,
 * passing in `a`.
 *
 * In short, this utility function swaps the order of parameters in a curried
 * function.
 */
export const flip = (fn) => (a) => (b) => fn(b)(a)

import { trace } from './trace.js'

const unflipped = trace('hi')
unflipped('there') // 'hi: there'

const flippedTrace = flip(trace)
const flipped = flippedTrace('hi')
flipped('there') // 'there: hi'
