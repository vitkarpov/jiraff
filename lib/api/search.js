var vow = require('vow');

var URL_JIRA = 'rest/api/latest/search';

function search(params) {
    var result = vow.defer();

    if (!params.q) {
        result.reject('There is no JQL specified');
        return result.promise();
    }

    this.request({
        pathname: URL_JIRA,
        method: 'POST',
        body: {
            jql: params.q
        }
    })
    .then(function(response) {
        var body = response.body;
        if (body.errorMessages) {
            return result.reject(body.errorMessages.join('\n'));
        }
        result.resolve(body);
    })
    .catch(result.reject.bind(result));


    return result.promise();
}

module.exports = search;