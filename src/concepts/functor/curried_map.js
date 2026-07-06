/** A generic map that works with any functor. */

import { curry } from '../../utils/curry.js'
const map = curry((fn, arr) => arr.map(fn))

const double = (n) => n * 2
const m_double = map(double)

import { Identity } from './identity.js'
const print = (x) => console.log(x)
m_double(Identity(4)).map(print) // 8
m_double([4, 8, 12]).map(print) // 8, 16, 24
