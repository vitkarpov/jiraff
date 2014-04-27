var fs = require('fs');
var path = require('path');

var Jiraff = function(config) {
    for (var option in config) {
        if (config.hasOwnProperty(option)) {
            this[option] = config[option];
        }
    }
};

addMethodsToPrototype('utils');
addMethodsToPrototype('api');

function addMethodsToPrototype(category) {
    fs.readdirSync(path.resolve(__dirname, category)).forEach(function(item) {
        var method = require(path.resolve(__dirname, category, item));
        if (method) {
            Jiraff.prototype[path.basename(item, '.js')] = method;
        }
    });
}

module.exports = Jiraff;