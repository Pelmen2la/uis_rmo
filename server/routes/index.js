var fs = require('fs'),
    utils = require('./../../static/js/utils/appUtils'),
    path = require('path');

var contactsPageData = {
    contactsData: getFakeContacts(utils.getRandomInt(15, 20), 'contact'),
    employeesGroups: getFakeEmployeesGroups(utils.getRandomInt(4, 7))
};

contactsPageData.employeesData = contactsPageData.employeesGroups.reduce((acc, next) => acc = acc.concat(next.employees), []);
contactsPageData.recentData = getFakeCalls(utils.getRandomInt(15, 20), true);

module.exports = function(app) {
    require('./socket')(app);

    app.get('/', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/index.html'), 'utf8', function(err, indexPageHtml) {
            res.send(indexPageHtml);
        });
    });

    app.get('/fake_data/recent_calls', function(req, res) {
        res.json(getFakeCalls(utils.getRandomInt(4, 8), true));
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

    app.get('/fake_data/get_contacts_page_tab_data/:tabType', function(req, res) {
        var tabType = req.params.tabType,
            searchText = req.query.searchText;
        if(tabType === 'employees') {
            var groups = contactsPageData.employeesGroups;
            groups = groups.map((g) => {
                return {
                    id: g.id,
                    name: g.name,
                    employees: filterPersonArrayData(g.employees, searchText)
                }
            });
            groups = groups.filter((g) => g.employees.length);
            res.json(groups);
        } else {
            var data = contactsPageData[req.params.tabType + 'Data'];
            res.json(filterPersonArrayData(data, searchText));
        }
    });

    function filterPersonArrayData(data, searchText) {
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
        return data;
    };

    app.get('/fake_data/get_contact/:id', function(req, res) {
        var contact = contactsPageData.contactsData.find((c) => c.id === req.params.id);
        contact.callsHistory = getFakeCalls(utils.getRandomInt(5, 10), true);
        res.json(contact);
    });

    app.get('/fake_data/get_employee/:id', function(req, res) {
        var employee = contactsPageData.employeesData.find((c) => c.id === req.params.id);
        employee.callsHistory = getFakeCalls(utils.getRandomInt(5, 10), true);
        res.json(employee);
    });

    app.get('/fake_data/get_number_info/:number', function(req, res) {
        res.json(getFakeFavoritesContacts(utils.getRandomInt(7, 12)));
    });

    app.get('/fake_data/try_get_contact_by_number/:phoneNumber', function(req, res) {
        var phoneNumber = req.params.phoneNumber,
            contact = contactsPageData.contactsData.find((c) => c.phone === phoneNumber),
            employee = contactsPageData.employeesData.find((e) => e.phone === phoneNumber);
        res.json(contact || employee || {});
    });
};

module.exports.getFakeCall = getFakeCall;

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

function getFakePerson(type) {
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
        type: type || (flipCoin() ? 'contact' : 'employee'),
        surname: surname,
        email: 'exampleemail@mail.ru',
        phone: getRandomPhoneNumber(),
        position: utils.getArrayRandom(positions),
        companyName: utils.getArrayRandom(companyNames),
        isInCall: flipCoin() ? 'in_call' : 'not_in_call',
        status: utils.getArrayRandom(['ok', 'not_ok', 'unknown']),
        id: getUid()
    }
};

function getFakeCalls(count, withContactsPagePerson) {
    var calls = [];
    for(var i = 0; i < count; i++) {
        calls.push(getFakeCall(withContactsPagePerson ? getRandomContactsPagePerson() : null));
    }
    return calls;
};

function getRandomContactsPagePerson() {
    var personList = flipCoin() ? contactsPageData.contactsData : contactsPageData.employeesData;
    return utils.getArrayRandom(personList);
};

function getFakeCall(callOwner) {
    callOwner = callOwner || getRandomContactsPagePerson();
    var isContact = callOwner.type === 'contact',
        date = new Date();
    date.setTime(date.getTime() - utils.getRandomInt(0, 3) * 60 * 60 * 24 * 1000);
    var callData = {
        date: date,
        call_session_id: getUid(),
        communication_id: getUid(),
        start_time: utils.getRandomInt(0, 9) + ':' + utils.getRandomInt(0, 9) + utils.getRandomInt(0, 9),
        direction: flipCoin() ? 'in' : 'out',
        call_source: 'sitephone',
        is_internal: flipCoin(),
        site_domain_name: utils.getArrayRandom(['an-diz.ru', 'test-site.ru', 'comagic.ru', 'uiscom.ru']),
        contact_id: isContact ? callOwner.id : null,
        contact_phone_number: isContact ? callOwner.phone : null,
        contact_full_name: isContact ? callOwner.name + ' ' + callOwner.surname : null,
        campaign_id: getUid(),
        campaign_name: utils.getArrayRandom(['Прямые переходы', 'Переходы из yandex', 'Google adwords']),
        employee_id: isContact ? null : callOwner.id,
        employee_full_name: isContact ? null : callOwner.name + ' ' + callOwner.surname,
        virtual_phone_number: isContact ? null : callOwner.phone,
        status: utils.getArrayRandom(['successful', 'unsuccessful', 'no_connection']),
        comment: flipCoin() ? 'Тестовый коммент бла бла бла' : '',
        companyName: isContact ? '' : callOwner.companyName,
        employeePosition: isContact ? '' : callOwner.position
    };

    if(flipCoin()) {
        callData.tags = ['обработан', 'продажа', 'важный клиент', 'важный звонок', 'обработан', 'продажа',
            'важный клиент', 'важный звонок', 'обработан', 'продажа', 'важный клиент', 'важный звонок'].splice(0, utils.getRandomInt(1, 12));
    } else {
        callData.tags = [];
    }
    return callData;
};

function getFakeCallQueueGroups(count) {
    var groups = [];
    for(var i = 0; i < count; i++) {
        var group = {
            name: ['Отдел продаж', 'Отдел щей', 'Отдел лещей', 'Отдел котов'][i],
            calls: getFakeCalls(utils.getRandomInt(4, 8), true),
            id: getUid()
        };
        groups.push(group);
    }
    return groups;
};

function getFakeEmployeesGroups(count) {
    var groups = [];
    for(var i = 0; i < count; i++) {
        groups.push({
            id: getUid(),
            name: 'Тестовая группа ' + i,
            employees: getFakeContacts(utils.getRandomInt(15, 20), 'employee')
        });
    }
    return groups;
};

function getFakeContacts(count, type) {
    var calls = [];
    for(var i = 0; i < count; i++) {
        var contactData = getFakePerson(type),
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
        var contactData = utils.getArrayRandom(contactsPageData[flipCoin() ? 'contactsData' : 'employeesData']);
        contacts.push(contactData);
    }
    return contacts;
};