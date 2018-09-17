var io = require('socket.io').listen(8070),
    mainRoutesModule = require('./index'),
    utils = require('./../../static/js/utils/appUtils');

module.exports = function(app) {
    io.sockets.on('connection', (socket) => {
    });

    app.get('/send_test_call', function(req, res) {
        var sockets = io.sockets.connected;
        for(var key in sockets) {
            sockets[key].emit('event', getTestIncomingCallData());
        }
        res.send('sended');
    });
};

function getTestIncomingCallData() {
    var contactData = mainRoutesModule.getRandomContact(),
        callData = {
            type: 'event',
            id: 107477414,
            name: 'call_proceeding',
            data: {
                call_session_id: getRandomCallSessionId(),
                communication_id: 548178456,
                start_time: '2018-08-09 15:02:30.267',
                direction: 'in',
                call_source: 'sitephone',
                is_internal: false,
                site_domain_name: 'an-diz.ru',
                contact_id: contactData.id,
                contact_phone_number: contactData.phone,
                contact_full_name: contactData.name + ' ' + contactData.surname,
                campaign_id: 130990,
                campaign_name: 'Прямые переходы',
                employee_id: contactData.id,
                employee_full_name: contactData.name + ' ' + contactData.surname,
                virtual_phone_number: '74951068263'
            }
        };
    return callData;
}

function getRandomCallSessionId() {
    var id = '';
    for(var i = 0; i < 9; i++) {
        id += utils.getRandomInt(0, 9);
    }
    return id;
}