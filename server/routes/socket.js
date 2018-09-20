var io = require('socket.io').listen(8070),
    mainRoutesModule = require('./index'),
    utils = require('./../../static/js/utils/appUtils');

module.exports = function(app) {
    io.sockets.on('connection', (socket) => {
    });

    app.get('/send_test_call', function(req, res) {
        var sockets = io.sockets.connected;
        for(var key in sockets) {
            sockets[key].emit('event', getTestIncomingCallEventData());
        }
        res.send('sended');
    });
};

function getTestIncomingCallEventData() {
    return {
        type: 'event',
        id: 107477414,
        name: 'call_proceeding',
        data: mainRoutesModule.getFakeCall()
    };
};

function getRandomCallSessionId() {
    var id = '';
    for(var i = 0; i < 9; i++) {
        id += utils.getRandomInt(0, 9);
    }
    return id;
}