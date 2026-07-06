import { compose } from './compose.js'
import { pipe } from './pipe.js'
import { trace } from './trace.js'
const g = (n) => n + 1
const f = (n) => n * 2

let h = compose(trace('after f'), f, trace('after g'), g)
h(20) // after g: 21, after f: 42

h = pipe(g, trace('after g'), f, trace('after f'))
h(20) // after g: 21, after f: 42

/*
What's happening in `compose`:

  `fns`: [trace('after f'), f, trace('after g'), g]
  `x`: 20

  `reduceRight()`: // x is initial, y is acc, f is curr
    `x`: 20

    iteration 1
      `y`: 20
      `f`: g
      `f(y)`: g(20) => 21
    iteration 2
      `y`: 21
      `f`: trace('after g')
      `f(y)`: trace('after g')(21) => log 'after g: 21' => 21
    iteration 3
      `y`: 21
      `f`: f
      `f(y)`: f(21) => 42
    iteration 4
      `y`: 42
      `f`: trace('after f')
      `f(y)`: trace('after f')(42) => log 'after f: 42' => 42
    
    return 42
*/
