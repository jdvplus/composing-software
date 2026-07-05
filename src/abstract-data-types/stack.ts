// implementing w/ an encapsulated object + pure functions
type StackADTObject<T> = {
  push: (item: T) => StackADTObject<T>
  pop: () => [T | undefined, StackADTObject<T>]
  print: () => T[]
  toString: () => string
}
type StackADT<T> = (...items: T[]) => StackADTObject<T>

/**
 * Takes an arbitrary number of items, and returns an object with four methods:
 *
 * 1. `push` - Takes an item and pushes it into the Stack.
 * 2. `pop` - Returns a tuple of the popped item and the updated Stack.
 * 3. `print` - Returns the current Stack.
 * 4. `toString` - Returns a string representing the current Stack.
 *
 * Key takeaway: the Stack itself lives in the `items` array, captured by the
 * closure of each returned object. Each time `stack(...)` is called, we get a
 * brand new object whose methods close over _that specific_ `items` array. The
 * Stack is recreated from scratch on every operation, and thus every instance
 * is _immutable_.
 */
export const stack_adt: StackADT<unknown> = (...items) => ({
  push: (item) => stack_adt(...items, item),

  pop: () => {
    const newItems = [...items] // can use items.slice() too
    const [item] = newItems.splice(-1)

    return [item, stack_adt(...newItems)]
  },

  print: () => [...items],

  toString: () => `[${items.join(', ')}]`,
})

export const push_adt = (item: unknown, s: StackADTObject<unknown>) =>
  s.push(item)
export const pop_adt = (s: StackADTObject<unknown>) => s.pop()

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

// implementing w/ pure functions using JS's Array prototype
type Stack<T> = (...items: T[]) => T[]
type Push<T> = (a: T, stack: T[]) => T[]
type Pop<T> = (stack: T[]) => [T | undefined, T[]]

/** Takes an arbitrary number of items, and returns a new array with those items. */
export const stack: Stack<unknown> = (...items) => [...items]

export const push: Push<unknown> = (a, s) => s.concat(a)
export const pop: Pop<unknown> = (s) => {
  const newStack = [...s] // can use s.slice() too
  const item = newStack.pop()

  return [item, newStack]
}

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
