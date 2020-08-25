let sortNums = function (arr) {
    return arr.sort((a, b) => a - b);
}

// Unit Tests Structure

// * The AAA Pattern: Arrange, Act, Assert

// Arrange all necessary preconditions and inputs

let nums = [2, 15, 4, 23, -10, -2];

// Act on the object or method under test

sortNums(nums);

// Assert that the obtained results are what we expect

if (JSON.stringify(nums) === '[-10,-2,2,4,15,23]') {
    console.error('They are equal!');
}