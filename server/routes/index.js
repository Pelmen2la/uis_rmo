var fs = require('fs'),
    utils = require('./../../static/js/utils/appUtils'),
    path = require('path');

const contacts = getFakeContacts(utils.getRandomInt(10, 20));

module.exports = function(app) {
    app.get('/', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/index.html'), 'utf8', function(err, indexPageHtml) {
            res.send(indexPageHtml);
        });
    });

    app.get('/fake_data/recent_calls', function(req, res) {
        res.json(getFakeCalls(utils.getRandomInt(2, 5)));
    });

    app.get('/fake_data/sales_department_calls', function(req, res) {
        res.json(getFakeCalls(utils.getRandomInt(2, 5)));
    });

    app.get('/fake_data/favorites_contacts', function(req, res) {
        res.json(getFakeFavoritesContacts(utils.getRandomInt(7, 12)));
    });

    app.get('/fake_data/contacts', function(req, res) {
        res.json(contacts);
    });

    app.get('/fake_data/get_contact/:id', function(req, res) {
        var contact = contacts.find((c) => c.id = req.params.id);
        res.json(contact);
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
        companyNames = ['Аврора', 'Ромашка', 'Звезда', 'ЮИС', 'Комеджик'],
        positions = ['специалист', 'генеральный директор', 'директор', 'менеджер'],
        male = flipCoin() ? 'male' : 'female',
        name = utils.getArrayRandom(male === 'male' ? maleNames : femaleNames),
        surname = utils.getArrayRandom(surnames);
    if(male === 'female') {
        surname += 'а';
    }
    return {
        name: name,
        surname: surname,
        email: 'exampleemail@mail.ru',
        phone: getRandomPhoneNumber(),
        position: utils.getArrayRandom(positions),
        companyName: utils.getArrayRandom(companyNames),
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

function getFakeContacts(count) {
    var calls = [];
    for(var i = 0; i < count; i++) {
        var contactData = getFakeEmployee(),
            date = new Date();
        date.setTime(date.getTime() - utils.getRandomInt(0 , 3) * 60 * 60 * 24 * 1000);
        contactData.isFavourite = flipCoin();
        contactData.avatarUrl = '';
        contactData.date = date;
        calls.push(contactData);
    }
    return calls;
};

function getFakeFavoritesContacts(count) {
    var contacts = [];
    for(var i = 0; i < count; i++) {
        var contactData = getFakeEmployee();
        contactData.isInCall = flipCoin() ? 'in_call' : 'not_in_call';
        contactData.status = utils.getArrayRandom(['ok', 'not_ok', 'unknown']);
        contacts.push(contactData);
    }
    return contacts;
};