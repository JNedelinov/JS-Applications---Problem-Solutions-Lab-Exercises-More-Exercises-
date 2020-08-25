// -- по-нов начин за добавяне

/* import sum from './sumFn'; */

/* describe('', () => {
    it('sdads', () => {
        let result = sum(['1', '3']);
        expect(result).to.eq(4, 'should equal 4');
    });
}); */

// -- по-стария начин за добавяне (преди ES6)

// let sum = require('./sumFn'); // нормално добавяне
let app = require('./sumFn');
// let sum = require('./sumFn').sum; // one way
let sum = app.sum; // another way
const { expect } = require('chai');
/* console.log(sum(1,3)); */

describe('sum(arr)', () => {

    it('test with string, returns NaN', function () {
        let result = sum('abc');
        expect(result).to.be.NaN;
    });

    it ('Checking if the result at the end is the same as expected', () => {
        let args = [1,5];
        let result = sum(args);
        expect(result).to.eql(6, `Expected the result to equal 6 not ${result}!`);
    });
    
    it ('Checking if the array includes elements with different types than a number', () => {
        let args = [1, 5, 24, 3];
        for (const el of args) {
            expect(typeof el).to.eql('number', `Expected the element ${el} type to equal number!`);
        }
        let result = sum(args);
        expect(result).to.eql(33, `Exprected the result to equal 33 not ${result}!`);
    });

    it ('Checking if the array is empty', () => {
        let args = [5];
        expect(args.length).to.be.above(0, 'Expected the array to have one or more elements!');
    });

});