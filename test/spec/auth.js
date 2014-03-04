var jiraff = require('..');
var vow = require('vow');
var sinon = require('sinon');

var dataAuth = {
    username: 'test',
    password: 'test'
};
var responseSuccess = {
    statusCode: 200,
    body: {
        session: {
            name: '1',
            value: '1'
        }
    },
    headers: {
        'set-cookie': ['1', '1', '1']
    }
};

describe('Auth', function() {
    describe('response on success', function() {
        before(function() {
            this.auth = sinon.stub(jiraff, 'auth');
            this.auth
                    .withArgs(dataAuth)
                    .returns(vow.when(responseSuccess));
        });

        after(function() {
            jiraff.auth.restore();
        });

        it('should have HTTP status code to be equal 200', function() {
            jiraff.auth(dataAuth).then(function(response) {
                response.statusCode.should.equal(200);
            });
        });

        it('should return session info', function() {
            jiraff.auth(dataAuth).then(function(response) {
                response.session.to.be.ok();
            });
        });

        it('should return Cookie header to sign another requests', function() {
            jiraff.auth(dataAuth).then(function(response) {
                response.headers['set-cookie'].join(',').to.be.ok();
            });
        });
    });

    describe('response on fail', function() {
        it('should have HTTP status not to be equal 200', function() {
            jiraff.auth({
                username: 'test',
                password: 'wrong!'
            }).then(function(response) {
                response.statusCode.not.to.be.ok();
            });
        });
    });
});