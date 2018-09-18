function getRandomInt(min, max) {
    return Math.round(getRandomFloat(min, max));
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

function getArrayRandom(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
};

function getCallOwnerNameAndPhoneNumb(callData) {
    const isEmployeeCall = !!callData.employee_id;
    return {
        name: isEmployeeCall ? callData.employee_full_name : callData.contact_full_name,
        number: isEmployeeCall ? callData.virtual_phone_number : callData.contact_phone_number
    };
};


module.exports = {
    getRandomFloat: getRandomFloat,
    getRandomInt: getRandomInt,
    getListAverage: getListAverage,
    getArrayAverage: getArrayAverage,
    getArrayRandom: getArrayRandom,
    getCallOwnerNameAndPhoneNumb: getCallOwnerNameAndPhoneNumb
};