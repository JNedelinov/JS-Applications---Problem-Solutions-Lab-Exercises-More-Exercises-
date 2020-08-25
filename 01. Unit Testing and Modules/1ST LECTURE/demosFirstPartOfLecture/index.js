// Common JS начин на import

const mod = require('./mod');

// 1.

console.log(mod.add(1,3)); // t = 100; res = 104

// 2.

mod.changeT(23); // t = 23

console.log(mod.add(1,3)); // res = 27 