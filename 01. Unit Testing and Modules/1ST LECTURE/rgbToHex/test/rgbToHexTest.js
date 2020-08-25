const { assert } = require('chai');
const { rgbToHexColor } = require('../rgbToHex');

const rgbToHex = require('../rgbToHex').rgbToHexColor;

let argumentsTest1 = [255, 158, 170];
let argumentsTest2 = [120, 253, 18];

describe('rgbToHext(red, green, blue)', () => {

    describe('First argument', () => {
        it('First argument should be a number', () => {
            assert.typeOf(argumentsTest1[0], 'number', 'The first argument should be a number');
            assert.typeOf(argumentsTest2[0], 'number', 'The first argument should be a number');
        });

        it('First argument should be in the range [0,255]', () => {
            assert.isAtLeast(argumentsTest1[0], 0, 'First argument should be bigger or equal to 0');
            assert.isAtMost(argumentsTest1[0], 255, 'First argument should be smaller or equal to 255');
            assert.isAtLeast(argumentsTest2[0], 0, 'First argument should be bigger or equal to 0');
            assert.isAtMost(argumentsTest2[0], 255, 'First argument should be smaller or equal to 255');
        });
    });

    describe('Second argument', () => {
        it('Second argument should be a number', () => {
            assert.typeOf(argumentsTest1[1], 'number', 'The second argument should be a number');
            assert.typeOf(argumentsTest2[1], 'number', 'The second argument should be a number');
        });

        it('Second argument should be in the range [0,255]', () => {
            assert.isAtLeast(argumentsTest1[1], 0, 'Second argument should be bigger or equal to 0');
            assert.isAtMost(argumentsTest1[1], 255, 'Second argument should be smaller or equal to 255');
            assert.isAtLeast(argumentsTest2[1], 0, 'Second argument should be bigger or equal to 0');
            assert.isAtMost(argumentsTest2[1], 255, 'Second argument should be smaller or equal to 255');
        });
    });

    describe('Third argument', () => {
        it('Third argument should be a number', () => {
            assert.typeOf(argumentsTest1[2], 'number', 'The third argument should be a number');
            assert.typeOf(argumentsTest2[2], 'number', 'The third argument should be a number');
        });

        it('Third argument should be in the range [0,255]', () => {
            assert.isAtLeast(argumentsTest1[2], 0, 'Third argument should be bigger or equal to 0');
            assert.isAtMost(argumentsTest1[2], 255, 'Third argument should be smaller or equal to 255');
            assert.isAtLeast(argumentsTest2[2], 0, 'Third argument should be bigger or equal to 0');
            assert.isAtMost(argumentsTest2[2], 255, 'Third argument should be smaller or equal to 255');
        });
    });

    describe('Result', () => {
        it('Result should be a Hexadecimal number equal to FF9EAA', () => {
            let result = rgbToHexColor(...argumentsTest1);
            assert.equal(result, '#FF9EAA', `${result} should be equal to #FF9EAA`);
        });

        it('Result should be a Hexadecimal number equal to 78FD12', () => {
            let result = rgbToHexColor(...argumentsTest2);
            assert.equal(result, '#78FD12', `${result} should be equal to #78FD12`);
        });
    });
});
