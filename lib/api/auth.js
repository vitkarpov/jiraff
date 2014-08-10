var vow = require('vow');

var URL_JIRA = 'rest/auth/1/session';

function auth(params) {
    var login = vow.defer();
    params = params || {};
    var dataAuth = params.u || ':';

    this.request({
        pathname: URL_JIRA,
        auth: {
            'username': dataAuth.split(':')[0] || this.username,
            'password': dataAuth.split(':')[1] || this.password
        }
    }).then(function(response) {
        if (200 !== response.statusCode) {
            return login.reject('Authentication failed. Status: ' + response.statusCode);
        }
        this.cookies = response.headers['set-cookie'] || false;
        this.logger('Authentication success', 'green');
        login.resolve();
    }.bind(this))
    .catch(login.reject.bind(login));

    return login.promise();
}

module.exports = auth;