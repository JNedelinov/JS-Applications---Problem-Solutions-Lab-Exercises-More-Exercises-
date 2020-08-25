const isOddOrEven = require('./app').isOddOrEven;

const lookupChar = require('./app').lookupChar;

const mathEnforcer = require('./app').mathEnforcer;

const { expect } = require('chai');

describe('All methods', () => {

    // isOddOrEven
    describe('isOddOrEven(string) function testing', () => {
        // Wrong Type of Parameters
        it('should return undefined with a number parameter', () => {
            let result = isOddOrEven(12);
            expect(result).to.equal(undefined, 'Function did not return the correct result!');
        });
        it('should return undefined with an object parameter', () => {
            let result = isOddOrEven({ name: 'Chico' });
            expect(result).to.equal(undefined, 'Function did not return the correct result!');
        });
        it('should return undefined with an array parameter', () => {
            let result = isOddOrEven([1, 2, 3]);
            expect(result).to.equal(undefined, 'Function did not return the correct result!');
        });
        // Even Or Odd
        it('should return correct result with an even length', () => {
            let result = isOddOrEven('string');
            expect(result).to.eq('even', 'Function did not return the correct result!');
        });
        it('should return correct result with an odd length', () => {
            let resut = isOddOrEven('strin');
            expect(resut).to.eq('odd', 'Function did not return the correct result!');
        });
        // Multiple Checks
        it('should return correct values with multiple consecutive checks', () => {
            expect(isOddOrEven('cat')).to.eq('odd', 'Function did not return the correct result!');
            expect(isOddOrEven('string')).to.eq('even', 'Function did not return the correct result!');
            expect(isOddOrEven('brid')).to.eq('even', 'Function did not return the correct result!');
        });
    });

    // lookUpChar
    describe('lookupChar(string,index) function testing', () => {
        // First Parameter
        it('should return undefined if the first parameter is a number', () => {
            expect(lookupChar(13, 1)).to.eq(undefined, 'The function returns an incorrect answer!');
        });
        it('should return undefined if the first parameter is an object', () => {
            expect(lookupChar({ name: "JJ" }, 1)).to.eq(undefined, 'The function returns an incorrect answer!');
        });
        it('should return undefined if the first parameter is an array', () => {
            expect(lookupChar([1, 3, 'abc'], 1)).to.eq(undefined, 'The function returns an incorrect answer!');
        });
        // Second Parameter
        it('should return undefined if the second parameter is a floating number', () => {
            expect(lookupChar('string', 3.14)).to.eq(undefined, 'The function returns an incorrect answer!');
        });
        it('should return undefined if the second parameter is a string', () => {
            expect(lookupChar('string', 'notAString')).to.eq(undefined, 'The function returns an inccorent asnwer!');
        });
        it('should return undefined if the second parameter is an object', () => {
            expect(lookupChar('string', { name: "JJ" })).to.eq(undefined, 'The function returns an inccorent asnwer!');
        });
        it('should return undefined if the second parameter is an array', () => {
            expect(lookupChar('string', [1, 2, 3])).to.eq(undefined, 'The function returns an inccorent asnwer!');
        });
        // Extra Tests
        it('should return undefined if both of the parameters are not the correct type - string, number', () => {
            expect(lookupChar(13, 'notAString')).to.eq(undefined, 'The function returns an inccorent asnwer!')
        });
        it('should return undefined if both of the parameters are not the correct type - string, number', () => {
            expect(lookupChar([1, 2, 3], { name: "JJ" })).to.eq(undefined, 'The function returns an inccorent asnwer!')
        });
        it('should return undefined if both of the parameters are not the correct type - string, number', () => {
            expect(lookupChar({ name: "JJ" }, [1, 2, 3])).to.eq(undefined, 'The function returns an inccorent asnwer!')
        });
        // Tests for the index
        it("should return 'Incorrect index' if the index is smaller than zero ", () => {
            expect(lookupChar('string', -1)).to.eq('Incorrect index', 'The function returns an incorrect answer!');
        });
        it("should return 'Incorrect index' if the index is equal to the string's length", () => {
            expect(lookupChar('string', 6)).to.eq('Incorrect index', 'The function returns an incorrect answer!');

        });
        it("should return 'Incorrect index' if the index is bigger than the string's length", () => {
            expect(lookupChar('string', 9)).to.eq('Incorrect index', 'The function returns an incorrect answer!');
        });
        // Test for the correctness
        it("should return the character at the position 'index' of the 'string'", () => {
            expect(lookupChar('string', 0)).to.eq('s', 'The function returns incorrect answer!');
        });
        it("should return the character at the position 'index' of the 'string'", () => {
            expect(lookupChar('string', 3)).to.eq('i', 'The function returns incorrect answer!');
        });
    });

    // mathEnforcer
    describe("mathEnforcer's methods testing", () => {

        // addFive(num) functionality
        describe("addFive method's functionality", () => {
            // if the parameter is NOT a type - number
            it('should return undefined if the parameter is a string', () => {
                expect(mathEnforcer.addFive('3')).to.eq(undefined, 'The function returns incorrect answer!');
            })
            it('should return undefined if the parameter is an array', () => {
                expect(mathEnforcer.addFive([1, 2, 3])).to.eq(undefined, 'The function returns incorrect answer!');
            });
            it('should return undefined if the parameter is an object', () => {
                expect(mathEnforcer.addFive({ name: "JJ" })).to.eq(undefined, 'The function returns incorrect answer!');
            });
            // if the parameter is a number
            it('should return the parameter + 5', () => {
                expect(mathEnforcer.addFive(3)).to.eq(8, 'The function returns an incorrect answer!');
            });
            it('should return the parameter + 5', () => {
                expect(mathEnforcer.addFive(5.01)).to.eq(10.01, 'The function returns an incorrect answer!');
            });
            it('should return the parameter + 5', () => {
                expect(mathEnforcer.addFive(-1.24)).to.eq(3.76, 'The function returns an incorrect answer!');
            });
            it('should return the parameter + 5', () => {
                expect(mathEnforcer.addFive(-1)).to.eq(4, 'The function returns an incorrect answer!');
            });
            it('should return the parameter + 5', () => {
                expect(mathEnforcer.addFive(-5)).to.eq(0, 'The function returns an incorrect answer!');
            });
            it('should return the parameter + 5', () => {
                expect(mathEnforcer.addFive(5)).to.eq(10, 'The function returns an incorrect answer!');
            });
        });

        // subtractTen(num) functionality
        describe("subtractTen method's functionality", () => {
            // if the parameter is NOT a type - number
            it('should return undefined if the parameter is a string', () => {
                expect(mathEnforcer.subtractTen('string')).to.eq(undefined, 'The function an incorrect answer!');
            });
            it('should return undefined if the parameter is an object', () => {
                expect(mathEnforcer.subtractTen({ name: 'JJ' })).to.eq(undefined, 'The function an incorrect answer!');
            });
            it('should return undefined if the parameter is an array', () => {
                expect(mathEnforcer.subtractTen([1, 2, 3, 'abc'])).to.eq(undefined, 'The function an incorrect answer!');
            });
            // if the parameter is a number
            it('should return the parameter - 10', () => {
                expect(mathEnforcer.subtractTen(15)).to.eq(5, 'The function returns an incorrect answer!');
            });
            it('should return the parameter - 10', () => {
                expect(mathEnforcer.subtractTen(5)).to.eq(-5, 'The function returns an incorrect answer!');
            });
            it('should return the parameter - 10', () => {
                expect(mathEnforcer.subtractTen(1042.59349)).to.eq(1032.59349, 'The function returns an incorrect answer!');
            });
            it('should return the parameter - 10', () => {
                expect(mathEnforcer.subtractTen(-10)).to.eq(-20, 'The function returns an incorrect answer!');
            });
            it('should return the parameter - 10', () => {
                expect(mathEnforcer.subtractTen(10)).to.eq(0, 'The function returns an incorrect answer!');
            });
        });

        // sum(num1, num2) functionality
        describe("sum method's functionality", () => {
            // if the first parameter is NOT a type - number
            it('should return undefined if the first parameter is a string', () => {
                expect(mathEnforcer.sum('string', 12)).to.eq(undefined,);
            });
            it('should return undefined if the first parameter is an object', () => {
                expect(mathEnforcer.sum({ name: "JJ" }, 12)).to.eq(undefined,);
            });
            it('should return undefined if the first parameter is an array', () => {
                expect(mathEnforcer.sum([1, 2, 3, 'abc'], 12)).to.eq(undefined,);
            });
            // if the second parameter is NOT a type - number
            it('should return undefined if the second parameter is a string', () => {
                expect(mathEnforcer.sum(12, 'string')).to.eq(undefined,);
            });
            it('should return undefined if the second parameter is an object', () => {
                expect(mathEnforcer.sum(12, { name: "JJ" })).to.eq(undefined,);
            });
            it('should return undefined if the second parameter is an array', () => {
                expect(mathEnforcer.sum(12, [1, 2, 3, 'abc'])).to.eq(undefined,);
            });
            // if both of the parameters are in the correct format (type), return answer
            it('should return first param + second param', () => {
                expect(mathEnforcer.sum(23, 43.3)).to.eq(66.3, 'The function retuns incorrect answer!');
            });
            it('should return first param + second param', () => {
                expect(mathEnforcer.sum(100.32, 21)).to.eq(121.32, 'The function retuns incorrect answer!');
            });
            it('should return first param + second param', () => {
                expect(mathEnforcer.sum(23.23, 52.37)).to.eq(75.60, 'The function retuns incorrect answer!');
            });
            it('should return first param + second param', () => {
                expect(mathEnforcer.sum(22.07, -52.07)).to.eq(-30.00, 'The function retuns incorrect answer!');
            });
            it('should return first param + second param', () => {
                expect(mathEnforcer.sum(-22, -22)).to.eq(-44.00, 'The function retuns incorrect answer!');
            });
            it('should return first param + second param', () => {
                expect(mathEnforcer.sum(-22, 22)).to.eq(0, 'The function retuns incorrect answer!');
            });
        });
    });
});




/*

describe('evenOrOdd(string) function testing', () => {
    it('Should have a string as an input', () => {
        let input = 'string';
        expect(typeof input).to.eq('string', `The input type should be always a string! Your input type is ${input instanceof Array ? 'an array' : input instanceof Object ? 'an object' : `a ${typeof input}`}.`);
    });
    it('Should return even', () => {
        let input = 'string';
        expect(typeof input).to.eq('string', `The input type should be always a string! Your input type is ${input instanceof Array ? 'an array' : input instanceof Object ? 'an object' : `a ${typeof input}`}.`);
        let length = input.length;
        let isEven = length % 2 === 0;
        expect(isEven).to.equal(true, 'Your string length is odd!');
    });
    it('Should return odd', () => {
        let input = 'strin';
        expect(typeof input).to.eq('string', `The input type should be always a string! Your input type is ${input instanceof Array ? 'an array' : input instanceof Object ? 'an object' : `a ${typeof input}`}.`);
        let length = input.length;
        let isOdd = length % 2 !== 0;
        expect(isOdd).to.equal(true, 'Your string length is even!');
    });
});

*/