var jiraff = require('..');
var vow = require('vow');
var sinon = require('sinon');

var responseSuccess = {
    total: 1,
    issues: [{
        id: '1',
        self: 'https://jira.expample.com/rest/api/latest/issue/1',
        key: 'PROJECT-1'
    }]
};

var responseFailMessage = 'Error in the JQL Query';

describe('Search', function() {
    describe('response for request with expexted query', function() {
        before(function() {
            this.search = sinon.stub(jiraff, 'search');
            this.search
                    .withArgs({
                        q: 'project=PROJECT-1'
                    })
                    .returns(vow.when(responseSuccess));
        });
        after(function() {
            jiraff.search.restore();
        });

        it('should have total value', function() {
            jiraff.search({
                q: 'project=PROJECT-1'
            }).then(function(response) {
                response.total.should.equal(1);
            });
        });

        it('should have an issues` array', function() {
            jiraff.search({
                q: 'project=PROJECT-1'
            }).then(function(response) {
                response.issues.to.be.ok();
            });
        });
    });

    describe('response for request with no query', function() {
        before(function() {
            this.search = sinon.stub(jiraff, 'search');
            this.search
                    .withArgs({
                        q: 'wrong JQL'
                    })
                    .returns(vow.when(responseFailMessage));
        });
        after(function() {
            jiraff.search.restore();
        });

        it('should return an error message', function() {
            jiraff.search({
                q: 'wrong JQL'
            }).then(function(response) {
                response.should.equal(responseFailMessage);
            });
        });
    });
});