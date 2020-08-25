// export and import грам не работят

/* export function sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
} */

/*
ако направим целия module.exports да е равен на тази функция,
всичко си е точно, но в момента, в който се опитаме да добавим към
module.exports някаква функция, всичко крашва
*/

/*
function sum(first,second) {
    return first+second;
}

module.exports = sum;
 */

/*

-- краша, за който споменах по-горе
-- веднага хвърля грешка, която гласи, че sum не е функция

module.exports.sum = function(first,second) {
    return first+second;
}


*/

/*

-- ако се опитваме да присвоим на module.exports някаква функция
и да я върнем, това крашва (този пример и примерът под него)

function sum(arr) {
    let sum = 0;
    for (num of arr) {
        sum += Number(num);
    }
    return sum;
}

*/

/*

module.exports.sum = function(arr) {
    return arr.reduce((acc,curr) => acc + curr, 0);
};

*/

module.exports = {
    sum: function(arr) {
        return arr.reduce((acc,curr) => acc + +curr, 0);
    }
}