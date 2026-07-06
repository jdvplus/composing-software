type User = { name: string; role: string }
type GetUserById = (id: number) => Promise<User | undefined>
type HasPermission = (user: User) => Promise<boolean>

// a => Promise(b)
const getUserById: GetUserById = (id) =>
  id === 3
    ? Promise.resolve({ name: 'John', role: 'Author' })
    : Promise.resolve(undefined)

// b => Promise(c)
const hasPermission: HasPermission = ({ role }) =>
  Promise.resolve(role === 'Author')

import { compose } from '../../utils/compose.js'
import { trace } from '../../utils/trace.js'

let authUser = compose(hasPermission, getUserById)
authUser(3).then(trace('API call composition')) // false (not true, as expected)
// fails because `hasPermission` expects a `User` but receives a Promise<User>

import { composeMonads } from './compose_monads.js'

const composePromises = composeMonads('then')
authUser = composePromises(hasPermission, getUserById)
authUser(3).then(trace('API call composition')) // true

/*
What's happening in the example above:

composeMonads('then')
  
  `method`: 'then'
  return (...monads) => ...

  composePromises(hasPermission, getUserById)

    `monads`: [hasPermission, getUserById]
    return monads.reduce(...) => ...

    reduce callbackFn

      `f`: hasPermission
      `g`: getUserById
      return (x) => ...

      authUser(3)

        `x`: 3
        return getUserById(3)['then'](hasPermission) => `true`
*/
