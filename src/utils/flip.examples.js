import { flip } from './flip.js'
import { trace } from './trace.js'

const unflipped = trace('hi')
unflipped('there') // 'hi: there'

const flippedTrace = flip(trace)
const flipped = flippedTrace('hi')
flipped('there') // 'there: hi'
