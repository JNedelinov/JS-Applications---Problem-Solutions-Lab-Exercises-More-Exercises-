const addSubtractFn = require('./addSubtract').createCalculator
const addSubtractObj = addSubtractFn();

const { expect } = require('chai');

describe('createCalculator()', () => {

    it('checks if value is number', () => {
        let currValueOfInnerVar = addSubtractObj.get();
        if (isNaN(currValueOfInnerVar)) {
            currValueOfInnerVar = 'NaN';
        }
        expect(currValueOfInnerVar).to.not.equal('NaN', "The inner variable's value should be a Number!");
    });

    it('add should return value + number', () => {
        let arg = Number('4');
        if (isNaN(arg)) { arg = 'NaN' }
        expect(arg).to.not.equal('NaN', "The inner parameter should be a Number!");
        addSubtractObj.add(arg);
        expect(addSubtractObj.get()).to.equal(6, `Result should be 6 not ${addSubtractObj.get()}`);
    });

    it('subtract should return value - number', () => {
        let arg = Number('2');
        if (isNaN(arg)) { arg = 'NaN' }
        expect(arg).to.not.equal('NaN', "The inner parameter should be a Number!");
        addSubtractObj.subtract(arg);
        expect(addSubtractObj.get()).to.equal(4, `Result should be 0 not ${addSubtractObj.get()}`);
    });

    it('get should return the value', () => {
        expect(addSubtractObj.get()).to.equal(4, `Result should be 0 not ${addSubtractObj.get()}`);
    });
});
