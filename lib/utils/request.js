var url = require('url');
var vowNode = require('vow-node');
var doRequest = vowNode.promisify(require('request'));

function request(settings) {
    var options = {
        uri: url.format({
            protocol: this.protocol,
            host: this.host,
            port: this.port,
            pathname: settings.pathname
        }),
        method: settings.method,
        json: true
    };

    if (this.cookies && this.cookies.length) {
        options.headers = {
            'Cookie': this.cookies.join(';')
        };
    }

    if (settings.body) {
        options.body = settings.body;
    }

    return doRequest(options);
}

module.exports = request;