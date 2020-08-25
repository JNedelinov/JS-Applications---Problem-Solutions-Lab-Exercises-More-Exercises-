const { expect } = require('chai');

const PaymentPackage = require('./app').PaymentPackage;

describe('PaymentPackage class functionality tests', () => {
    let instance1 = null;
    let instance2 = null;
    let validName = null;
    let validValue = null;

    describe('construction functionality - instantiation - happy path - tests', () => {
        beforeEach(() => {
            validName = 'HR Services';
            validValue = 1500;

            instance1 = new PaymentPackage(validName, validValue);
        });

        it('should have all properties the params and the default ones', () => {
            expect(instance1.hasOwnProperty('_name')).to.equal(true, 'The instance of class PaymentPackage does not have a name property!');
            expect(instance1.hasOwnProperty('_value')).to.equal(true, 'The instance of class PaymentPackage does not have a value property!');
            expect(instance1.hasOwnProperty('_VAT')).to.equal(true, 'The instance of class PaymentPackage does not have a VAT property!');
            expect(instance1.hasOwnProperty('_active')).to.equal(true, 'The instance of class PaymentPackage does not have a active property!');
        });

        it('should set a new value to the instance.name', () => {
            instance1.name = 'New Value';
            expect(instance1.name).to.equal('New Value', 'The setter does not work properly for the name!');
        });

        it('should get the value of the instance.name', () => {
            expect(instance1.name).to.equal(validName, 'The getter does not work properly for the name!');
        })

        it('should set a new value to the instance.value', () => {
            instance1.value = 1000;
            expect(instance1.value).to.equal(1000, 'The setter does not work properly for the value!');
        });

        it('should get the value of the instance.value', () => {
            expect(instance1.value).to.equal(validValue, 'The getter does not work properly for the value!');
        });

        it('should have a default value of the VAT value', () => {
            expect(instance1.VAT).to.equal(20, 'The default value of VAT should be 20!')
        });

        it('should get the value of the instance.VAT', () => {
            expect(instance1.VAT).to.equal(20, 'The getter does not work for the VAT value!');
        });

        it('should be possible to set a new value to the VAT value', () => {
            instance1.VAT = 12;
            expect(instance1.VAT).to.equal(12, 'The setter for the VAT value does not work!');
        });

        it('should have a default value of the active boolean value', () => {
            expect(instance1.active).to.equal(true, 'The default value of active boolean value!')
        });

        it('should get the value of the active boolean value', () => {
            expect(instance1.active).to.equal(true, 'The getter does not work for the active boolean value!')
        });

        it('should be possible to set a new value to the active boolean value', () => {
            instance1.active = false;
            expect(instance1.active).to.equal(false, 'The setter for the active boolean value does not work!');
        });
    });

    describe('constructor functionality - instantiation - errors - tests', () => {

        beforeEach(() => {
            validName = 'HR Services';
            validValue = 1500;

            instance1 = new PaymentPackage(validName, validValue);
        });

        it('should throw error if name is empty string', () => {
            expect(() => instance2 = new PaymentPackage('', 20)).to.throw();
        });

        it('should throw error if value is negative number', () => {
            expect(() => instance2 = new PaymentPackage('valid', -1)).to.throw();
        });

        it('should throw error if VAT is negative number', () => {
            expect(() => instance1.VAT = -1).to.throw();
        });

        it('should throw error if active is not a boolean', () => {
            expect(() => instance1.active = null).to.throw();
        });

        it('should throw error if name is not a string', () => {
            expect(() => instance2 = new PaymentPackage(12, validValue)).to.throw();
            expect(() => instance2 = new PaymentPackage([], validValue)).to.throw();
            expect(() => instance2 = new PaymentPackage({}, validValue)).to.throw();
            expect(() => instance2 = new PaymentPackage(null, validValue)).to.throw();
        });

        it('should throw error if value is not a number', () => {
            expect(() => instance2 = new PaymentPackage(validName, '')).to.throw();
            expect(() => instance2 = new PaymentPackage(validName, null)).to.throw();
            expect(() => instance2 = new PaymentPackage(validName, [])).to.throw();
            expect(() => instance2 = new PaymentPackage(validName, {})).to.throw();
        });
    });

    describe('toString() public method functionality - tests', () => {

        beforeEach(() => {
            validName = 'HR Services';
            validValue = 1500;

            instance1 = new PaymentPackage(validName, validValue);

            /* result = instance1.toString() */
        });


        it('should return a string with the package and the values', () => {
            if (instance1.active) {
                expect(instance1.toString()).to.equal(`Package: ${instance1.name}\n- Value (excl. VAT): ${instance1.value}\n- Value (VAT ${instance1.VAT}%): ${instance1.value += instance1.value * (instance1.VAT / 100)}`);
            }
        });

        it('should throw an error if the instance.active is false', () => {
            instance1.active = false;
            expect(instance1.toString()).to.equal(`Package: ${instance1.name} (inactive)\n- Value (excl. VAT): ${instance1.value}\n- Value (VAT ${instance1.VAT}%): ${instance1.value += instance1.value * (instance1.VAT / 100)}`);
        });
    });
});