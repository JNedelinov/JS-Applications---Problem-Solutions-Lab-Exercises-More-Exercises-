/* let isSymmetric = require('./solution').isSymmetric; */

// тъй като с require се взима module.exports обекта, ние от своя страна
// слагайки точка след - require('./solution') е равно на obj.isSymmetric
// общо казано, взимаме метод от module.exports

let isSymmetric = require('./solution').isSymmetric;

/* console.log(isSymmetric([1,2,3,2,1])); */

const args = [1, 2, 3, 2, 1];

let assert = require('chai').assert;

describe('isSymmetry(arr)', () => {

    it('Check if the type of the array', () => {
        assert.typeOf(args, 'array', 'The type of the input is not an array!');
    });

    it('Check if the array is empty?', () => {
        if (typeof args !== 'array') { assert.typeOf(args, 'array', 'The type of the input is not an array!'); }
        assert.isAbove(args.length, 0, 'The array should have at least one 1 argument!');
    });

    it('Check if the array is asymmetric?', () => {
        if (typeof args !== 'array') { assert.typeOf(args, 'array', 'The type of the input is not an array!'); }
        let result = isSymmetric(args);
        assert.isTrue(result, 'The array is not asymmetryc!');
    });

});