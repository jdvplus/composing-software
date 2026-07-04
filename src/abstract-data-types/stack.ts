// implementing w/ an encapsulated object + pure functions
type Stack<T> = {
  push: (item: T) => Stack<T>
  pop: () => [T | undefined, Stack<T>]
  toString: () => string
}
type StackADT<T> = (...items: T[]) => Stack<T>

/**
 * Takes an arbitrary number of items, and returns an object with three methods:
 *
 * 1. `push` - Takes an item and pushes it into the Stack.
 * 2. `pop` - Returns a tuple of the popped item and the updated Stack.;
 * 3. `toString` - Returns a string representing the current Stack.
 *
 * Key takeaway: the Stack itself lives in the `items` array, captured by the
 * closure of each returned object. Each time `stack(...)` is called, we get a
 * brand new object whose methods close over _that specific_ `items` array. The
 * Stack is recreated from scratch on every operation, and thus every instance
 * is _immutable_.
 */
const stack: StackADT<unknown> = (...items) => ({
  push: (item) => stack(...items, item),

  pop: () => {
    const newItems = [...items]
    const [item] = newItems.splice(-1)

    return [item, stack(...newItems)]
  },

  toString: () => `Stack: [${items.join(', ')}]`,
})

const push = (item: unknown, s: Stack<unknown>) => s.push(item)
const pop = (s: Stack<unknown>) => s.pop()

let s1 = stack()

s1 = push("'a'", s1)
s1 = push(1, s1)
s1 = push(true, s1)
console.log(s1.toString()) // ['a', 1, true]

const [x, rest] = pop(s1)
console.log(x) // true
console.log(s1.toString()) // ['a', 1, true] | note that the original Stack is unchanged!
console.log(rest.toString()) // ['a', 1]

// implementing w/ pure functions using JS's Array prototype
type StackTwo<T> = (...items: T[]) => T[]
type Push<T> = (a: T, stack: T[]) => T[]
type Pop<T> = (stack: T[]) => [T | undefined, T[]]

/** Takes an arbitrary number of items, and returns a new array with those items. */
const stackTwo: StackTwo<unknown> = (...items) => [...items]

const pushTwo: Push<unknown> = (a, s) => s.concat(a)
const popTwo: Pop<unknown> = (s) => {
  const newStack = s.slice(0)
  const item = newStack.pop()

  return [item, newStack]
}

let s2 = stackTwo('b', 2)
console.log(s2) // ['b', 2]
s2 = pushTwo(false, s2)
console.log(s2) // ['b', 2, false]
console.log(popTwo(s2)) // [ false, ['b', 2] ]
