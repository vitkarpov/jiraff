'use strict';

var url = require('url');
var vowNode = require('vow-node');
var doRequest = vowNode.promisify(require('request'));
var qs = require('qs');

function request(settings) {
    var options = {
        method: settings.method,
        json: true
    };
    var partsUrl = {
        protocol: this.protocol,
        host: this.host,
        port: this.port,
        jar: true,
        pathname: settings.pathname
    };

    if (settings.body) {
        options.body = settings.body;
    }
    if (settings.search) {
        partsUrl.search = settings.search;
    }
    if (settings.query) {
        partsUrl.query = '?' + qs.stringify(settings.query);
    }

    options.uri = url.format(partsUrl);

    console.log(options.uri);

    return doRequest(options);
}

module.exports = request;