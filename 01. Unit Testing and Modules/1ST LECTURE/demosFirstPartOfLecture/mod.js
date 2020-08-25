// Common JS начин на export

// In Node.js each file has its own scope

let t = 100;

// Common JS начин на export

// 1.

module.exports.add = function (a, b) {
    return t + a + b;
};

// 2.

module.exports.changeT = function (newValue) {
    t = newValue;
};

/*
    module.exports = function() {
        return {

        };
    };
*/