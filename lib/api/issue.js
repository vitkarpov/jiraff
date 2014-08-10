var vow = require('vow');

var URL_JIRA = 'rest/api/latest/issue/';

function issue(params) {
    var result = vow.defer();

    if (!params.q) {
        result.reject('Invalid issue`s id or key');
        return result.promise();
    }

    this.request({
        pathname: URL_JIRA + params.q,
        method: 'GET'
    })
    .then(function(response) {
        result.resolve(response.body);
    })
    .catch(result.reject.bind(result));

    return result.promise();
}

module.exports = issue;