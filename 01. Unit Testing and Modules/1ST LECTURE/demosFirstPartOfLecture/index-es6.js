// ES6 Modules

// change the name after importing (down)

import { add as modAdd, changeT } from './mod-es6';

import t from './mod-es6';

import * as mod from './mod-es6.mjs';

const a = modAdd(1, 3);

console.log(a, t, mod.add(1,3));