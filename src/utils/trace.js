/**
 * Takes a label, and returns a function which takes a value and logs the label
 * and value before finally returning the value.
 */
export const trace = (label) => (value) => {
  console.log(`${label}: ${value}`)
  return value
}
