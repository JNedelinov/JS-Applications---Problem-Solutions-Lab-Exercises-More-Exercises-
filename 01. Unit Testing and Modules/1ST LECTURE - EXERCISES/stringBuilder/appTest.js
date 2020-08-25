let StringBuilder = require('./app').StringBuilder;

const { expect } = require('chai');

describe("class StringBuilder's methods on different instances of the class", () => {
    let instance = null;
    let startingString = null;
    let index = null;

    // constructor functionality
    describe('constructor functionality - instantiation', () => {
        // valid params
        it('works with a valid parameter which is only of type string', () => {
            expect(() => new StringBuilder('string')).to.not.throw();
        });
        it('works with a valid parameter which is only of type string - empty string', () => {
            expect(() => new StringBuilder('')).to.not.throw();
        });
        // invalid params
        it('does not work with a param of type number', () => {
            expect(() => new StringBuilder(12)).to.throw();
        });
        // does not work with an instace of Array (because the arrays are type object)
        it('does not work with a param of type array', () => {
            expect(() => new StringBuilder([1, 2, 3])).to.throw();
        });
        it('does not work with a param of type object', () => {
            expect(() => new StringBuilder({})).to.throw();
        });
    });

    describe('constructor functionality - with input empty string', () => {
        beforeEach(() => {
            instance = new StringBuilder();
        });

        it('should have all properties declared', () => {
            expect(instance.hasOwnProperty('_stringArray')).to.eq(true, 'The property _stringArray is missing!');
        });

        it('should have all methods declared', () => {
            expect(Object.getPrototypeOf(instance).hasOwnProperty('append')).to.eq(true, 'The method append() is missing!');
            expect(Object.getPrototypeOf(instance).hasOwnProperty('prepend')).to.eq(true, 'The method prepend() is missing!');
            expect(Object.getPrototypeOf(instance).hasOwnProperty('insertAt')).to.eq(true, 'The method insertAt() is missing!');
            expect(Object.getPrototypeOf(instance).hasOwnProperty('remove')).to.eq(true, 'The method remove() is missing!');
            expect(Object.getPrototypeOf(instance).hasOwnProperty('toString')).to.eq(true, 'The method toString() is missing!');
        });

        it('should initialize data to an empty array', function () {
            expect(instance._stringArray instanceof Array).to.eq(true, 'Data must be of type array');
            expect(instance._stringArray.length).to.eq(0, 'Data array must be initialized empty');
        });
    });

    describe('Testing the Methods', () => {
        beforeEach(() => {
            startingString = 'hello'
            instance = new StringBuilder(startingString);
            index = 0;
        });

        // append(string) method

        it('invalid append parameter', function () {
            let willThrow = () => instance.append(5);
            expect(willThrow).to.throw();
        });

        it('should return the current string with freshly concatenated at the end input string', () => {
            let testString = startingString + ', there';
            instance.append(', there')
            expect(stringComparer(instance, testString)).to.eq(true, 'The method returns incorrect result!');
        });
        it('should return the current string with freshly concatenated at the end input string', () => {
            let testString = startingString + ', there!';
            instance.append(', there!');
            expect(stringComparer(instance, testString)).to.eq(true, 'The method returns incorrect result!');
        });

        // prepend(string) method

        it('invalid prepend parameter', function () {
            let willThrow = () => instance.prepend(5);
            expect(willThrow).to.throw();
        });

        it('should return the current string wtih the input string concatenated at the start of it', () => {
            let testString = 'User1 ' + startingString;
            instance.prepend('User1 ');
            expect(stringComparer(instance, testString)).to.eq(true, 'The method returns incorrect result!');
        });
        it('should return the current string wtih the input string concatenated at the start of it', () => {
            let testString = 'Welcome User1 ' + startingString;
            instance.prepend('User1 ');
            instance.prepend('Welcome ');
            expect(stringComparer(instance, testString)).to.eq(true, 'The method returns incorrect result!');
        });

        // index conditions

        it('index coditions', () => {
            // if index is a number
            expect(typeof index).to.eq('number', 'The index is not a number!');
            // if index is bigger or equal to 0
            expect(index).to.be.above(-1, 'The index is less than zero!');
            // if index is less or equal to the string's length
            expect(index).to.be.below(startingString.length + 1, "The index is bigger than the string's length!");
        });

        // insertAt(string, index) method

        it('invalid insertAt parameter', function () {
            let willThrow = () => instance.insertAt(5, 1);
            expect(willThrow).to.throw();
        });
        
        it("should return the current string with the inserted new string", () => {
            let testString = 'valid string ' + startingString;
            instance.insertAt('valid string ', index);
            expect(stringComparer(instance, testString)).to.eq(true, 'The method returns incorrect result!');
        });

        // remove(index, length) public method

        it("should return the current string removed n elements", () => {
            testString = startingString;
            testString = testString.slice(startingString.length);
            instance.remove(index, startingString.length);
            expect(stringComparer(instance, testString)).to.eq(true, 'The method returns incorrect result!');
        });

        // toString() public method

        it('should return the concatenated array', () => {
            expect(instance.toString()).to.eq('hello', 'The method returns an incorrect answer!');
        });

        function stringComparer(instance = {}, testString = '') {
            let instanceString = instance._stringArray.join('');
            if (testString === instanceString) {
                return true;
            } else {
                return false;
            }
        }
    });
});