'use strict';

var vow = require('vow');

var URL_JIRA = 'rest/api/latest/search';

function search(params) {
    var result = vow.defer();
    this.logger('Fetching search results...');

    if (!params.q) {
        this.logger('There is no JQL specified', 'red');
        process.exit(1);
    }

    this.request({
        pathname: URL_JIRA,
        method: 'POST',
        body: {
            jql: params.q
        }
    }).then(
        function(response) {
            var body = response.body;
            if (body.errorMessages) {
                return result.reject(body.errorMessages.join('\n'));
            }
            result.resolve(body);
        },
        function(error) {
            result.reject(error);
        }
    );

    return result.promise();
}

module.exports = search;