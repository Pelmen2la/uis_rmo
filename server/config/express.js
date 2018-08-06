'use strict';

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cacheTime = 86400000 * 7; //7 days

module.exports = function(app) {
    app.use(express.static(path.join(global.appRoot, 'static'), {maxAge: cacheTime}));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};