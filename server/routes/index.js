var fs = require('fs'),
    utils = require('./../../static/js/utils/appUtils'),
    path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/index.html'), 'utf8', function(err, indexPageHtml) {
            res.send(indexPageHtml);
        });
    });

    app.get('/fake_data/recent_calls', function(req, res) {
        res.json(getFakeCalls(5));
    });
};

function flipCoin() {
    return Math.random() >= 0.5;
};

function getRandomPhoneNumber() {
    var phone = '7';
    for(var i = 0; i < 10; i++) {
        phone += utils.getRandomInt(0, 9);
    }
    return phone;
};

function getUid() {
    function getPart() {
        var part = (Math.random() * 46656) | 0;
        return ("000" + part.toString(36)).slice(-3);
    }
    return getPart() + getPart();
};

function getFakeEmployee() {
    var maleNames = ['Петр', 'Степан', 'Денис', 'Виктор', 'Уалихан', 'Алексей'],
        femaleNames = ['Свелана', 'Гузаль', 'Валерия', 'Мария', 'Анна'],
        surnames = ['Гаврилин', 'Корнеев', 'Петров', 'Иванов', 'Зверев'],
        male = flipCoin() ? 'male' : 'female',
        name = utils.getArrayRandom(male === 'male' ? maleNames : femaleNames),
        surname = utils.getArrayRandom(surnames);
    if(male === 'female') {
        surname += 'а';
    }
    return {
        name: name,
        surname: surname,
        phone: getRandomPhoneNumber(),
        id: getUid()
    }
};

function getFakeCalls(count) {
    var calls = [];
    for(var i = 0; i < count; i++) {
        var callData = getFakeEmployee();
        callData.direction = flipCoin() ? 'in' : 'out';
        callData.showName = flipCoin();
        callData.time = utils.getRandomInt(0, 9) + ':' + utils.getRandomInt(0, 9) + utils.getRandomInt(0, 9);
        calls.push(callData);
    }
    return calls;
};