type Stringify<T> = (value: T | T[]) => string

const stringify: Stringify<unknown> = (value: unknown): string =>
  Array.isArray(value) ? `[${value.map(stringify).join(', ')}]` : `${value}`

/**
 * A utility function that displays the results of a unit test, or throws a
 * descriptive error of why it failed.
 */
export const assert = ({
  given,
  should,
  actual,
  expected,
}: {
  given: string
  should: string
  actual: unknown
  expected: unknown
}): void => {
  const actualString = stringify(actual)
  const expectedString = stringify(expected)

  if (actualString === expectedString) {
    console.log(`OK:
      given: ${given}
      should: ${should}
      actual: ${actualString}
      expected: ${expectedString}
    `)
  } else {
    throw new Error(`ERROR:
      given ${given}
      should ${should}
      actual: ${actualString}
      expected: ${expectedString}
    `)
  }
}
