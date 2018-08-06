var fs = require('fs'),
    path = require('path');

module.exports = function(app) {
    app.get('/', function(req, res) {
        fs.readFile(path.join(global.appRoot, '/static/html/index.html'), 'utf8', function(err, indexPageHtml) {
            res.send(indexPageHtml);
        });
    });
};