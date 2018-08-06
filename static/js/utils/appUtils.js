function getRandomInt(min, max) {
    return Math.floor(getRandomFloat(min, max));
};

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
};

function getListAverage(list) {
    return getArrayAverage(list.toJS());
};

function getArrayAverage(arr) {
    var sum = 0;
    arr.forEach((e) => sum += e);
    return arr.length ? sum / arr.length : 0;
};

export default {
    getRandomFloat: getRandomFloat,
    getRandomInt: getRandomInt,
    getListAverage: getListAverage,
    getArrayAverage: getArrayAverage
};