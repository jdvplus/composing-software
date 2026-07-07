import { Identity as IdentityMonad } from './identity.js'

IdentityMonad(21)
  .map((x) => x * 2)
  .map((x) => console.log(x)) // 42

console.log(
  IdentityMonad(21)
    .map((x) => x * 2)
    .map((x) => x + 1)
    .toString(),
) // IdentityMonad(43)
