// We can use `Array.prototype.reduce()` to define `map`, `filter`, and `forEach`.

const map = (fn, arr) => {
  return arr.reduce((acc, curr, index, array) => {
    return acc.concat(fn(curr, index, array))
  }, [])
}

const filter = (fn, arr) => {
  return arr.reduce((acc, curr) => {
    return fn(curr) ? acc.concat(curr) : acc
  }, [])
}

const forEach = (fn, arr) => {
  return arr.reduce((acc, curr, index, array) => {
    fn(curr, index, array)
    return acc // remember...
  }, undefined) // ...`Array.prototype.forEach()` doesn't return anything
}
