var fs = require('fs'),
    utils = require('./../../static/js/utils/appUtils'),
    path = require('path');

const contactsPageData = {
    recentData: getFakeCalls(utils.getRandomInt(10, 20)),
    contactsData: getFakeContacts(utils.getRandomInt(10, 20)),
    employeesData: getFakeContacts(utils.getRandomInt(10, 20))
};

module.exports = function(app) {
    app.get('/', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/index.html'), 'utf8', function(err, indexPageHtml) {
            res.send(indexPageHtml);
        });
    });

    app.get('/fake_data/recent_calls', function(req, res) {
        res.json(getFakeCalls(utils.getRandomInt(2, 5)));
    });

    app.get('/fake_data/call_queue_groups', function(req, res) {
        res.json(getFakeCallQueueGroups(utils.getRandomInt(2, 4)));
    });

    app.get('/fake_data/sales_department_calls', function(req, res) {
        res.json(getFakeCalls(utils.getRandomInt(2, 5)));
    });

    app.get('/fake_data/favorites_contacts', function(req, res) {
        res.json(getFakeFavoritesContacts(utils.getRandomInt(7, 12)));
    });

    app.get('/fake_data/get_grid_data/:gridType', function(req, res) {
        var data = contactsPageData[req.params.gridType + 'Data'],
            searchText = req.query.searchText;
        if(searchText) {
            data = data.filter((rec) => {
                const props = ['name', 'surname', 'email', 'phone', 'companyName'];
                searchText = searchText.toLowerCase();
                for(var prop, i = 0; prop = props[i]; i++) {
                    if(rec[prop] && rec[prop].toLowerCase().indexOf(searchText) > -1) {
                        return true;
                    }
                }
                return false;
            });
        }
        res.json(data);
    });

    app.get('/fake_data/get_contact/:id', function(req, res) {
        var contact = contactsPageData.contactsData.find((c) => c.id = req.params.id);
        contact.callsHistory = getFakeCalls(utils.getRandomInt(5, 10));
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
        var callData = getFakeEmployee(),
            date = new Date();
        date.setTime(date.getTime() - utils.getRandomInt(0 , 3) * 60 * 60 * 24 * 1000);
        callData.date = date;
        callData.direction = flipCoin() ? 'in' : 'out';
        callData.isInternal = flipCoin();
        callData.showName = flipCoin();
        callData.status = utils.getArrayRandom(['successful', 'unsuccessful', 'no_connection']);
        callData.time = utils.getRandomInt(0, 9) + ':' + utils.getRandomInt(0, 9) + utils.getRandomInt(0, 9);
        callData.comment = flipCoin() ? 'Тестовый коммент бла бла бла ' + i : '';
        if(flipCoin()) {
            callData.tags = ['обработан', 'продажа', 'важный клиент', 'важный звонок', 'обработан', 'продажа',
                'важный клиент', 'важный звонок', 'обработан', 'продажа', 'важный клиент', 'важный звонок'].splice(0, utils.getRandomInt(1, 12));
        } else {
            callData.tags = [];
        }
        calls.push(callData);
    }
    return calls;
};

function getFakeCallQueueGroups(count) {
    var groups = [];
    for(var i = 0; i < count; i++) {
        var group = {
            name: ['Отдел продаж', 'Отдел щей', 'Отдел лещей', 'Отдел котов'][i],
            calls: getFakeCalls(utils.getRandomInt(4, 7)),
            id: getUid()
        };
        groups.push(group);
    }
    return groups;
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