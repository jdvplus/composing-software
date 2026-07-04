import { assert } from '../test/assert.ts'
import { stack_adt, push_adt, pop_adt, stack, push, pop } from './stack.ts'

// encapsulated object tests
assert({
  given: 'push `a` to the stack and immediately pop from the stack',
  should: 'return a pair of `a` and `stack()`',
  actual: pop_adt(push_adt('a', stack_adt())),
  expected: ['a', stack_adt()],
})
assert({
  given:
    'push `a` to the stack, then push `b` to the stack, then pop from the stack',
  should: 'return a pair of `b` and `stack(a)`.',
  actual: pop_adt(push_adt('b', push_adt('a', stack_adt()))),
  expected: ['b', stack_adt('a')],
})
assert({
  given: 'pop from an empty stack',
  should: 'return `undefined`',
  actual: pop_adt(stack_adt()),
  expected: [undefined, []],
})

// Array.prototype tests
assert({
  given: 'push `a` to the stack and immediately pop from the stack',
  should: 'return a pair of `a` and `stack()`',
  actual: pop(push('a', stack())),
  expected: ['a', stack()],
})
assert({
  given:
    'push `a` to the stack, then push `b` to the stack, then pop from the stack',
  should: 'return a pair of `b` and `stack(a)`.',
  actual: pop(push('b', push('a', stack()))),
  expected: ['b', stack('a')],
})
assert({
  given: 'pop from an empty stack',
  should: 'return `undefined`',
  actual: pop(stack()),
  expected: [undefined, []],
})
