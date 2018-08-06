'use strict';

var express = require('express'),
    compression = require('compression'),
    path = require('path'),
    app = express();

global.appRoot = path.resolve(__dirname);

app.use(compression());

var server = app.listen(process.env.PORT || 3002, 'localhost', function () {
    console.log('App listening on port ' + server.address().port);
});

require('./server/config/index')(app);
require('./server/routes/index')(app);

process.on('uncaughtException', function(err) {
    console.error(err);
});
