import { stack_adt, push_adt, pop_adt, stack, push, pop } from './stack.ts'

console.log('--- encapsulated object tests ---')
let s1 = stack_adt('a', 1, true)
console.log(s1.print()) // ['a', 1, true]

s1 = push_adt('b', s1)
s1 = push_adt(2, s1)
s1 = push_adt(false, s1)
console.log(s1.print()) // ['a', 1, true, 'b', 2, false]

const [popped_adt, rest_adt] = pop_adt(s1)
console.log(popped_adt) // false
console.log(rest_adt.print()) // ['a', 1, true, 'b', 2]
console.log(s1.print()) // ['a', 1, true, 'b', 2, false]
// note that the original Stack is unchanged.
s1 = stack_adt(...rest_adt.print()) // here, we pass the rest_adt into a new Stack
console.log(s1.print()) // ['a', 1, true, 'b', 2]
// _now_ we get the new Stack.

// ----------------------------------------------------------------------------

console.log('\n--- Array prototype tests ---')
let s2 = stack('a', 1, true)
console.log(s2) // ['a', 1, true]

s2 = push('b', s2)
s2 = push(2, s2)
s2 = push(false, s2)
console.log(s2) // ['a', 1, true, 'b', 2, false]

const [popped, rest] = pop(s2)
console.log(popped) // false
console.log(rest) // ['a', 1, true, 'b', 2]
console.log(s2) // ['a', 1, true, 'b', 2, false] (unchanged)
s2 = stack(...rest) // pass the rest into a new Stack
console.log(s2) // ['a', 1, true, 'b', 2] (new Stack)
