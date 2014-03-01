var Jiraff = require('../lib/jiraff');
var settings = {
    protocol: "https",
    host: "jira.example.com",
    port: "8081",
    username: "test",
    password: "test"
};

module.exports = new Jiraff(settings);