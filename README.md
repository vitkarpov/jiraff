# A simple nodejs wrapper for the JIRA's RESTful API

[![NPM version](https://badge.fury.io/js/jiraff.png)](http://badge.fury.io/js/jiraff)
[![Build Status](https://travis-ci.org/vitkarpov/jiraff.png?branch=master)](https://travis-ci.org/vitkarpov/jiraff)

**Jiraff** is a nodejs module which provides a javascript wrapper for the JIRA's RESTful API. You can use it in nodejs and via CLI.

[Original JIRA API](https://docs.atlassian.com/jira/REST/latest/)

## Install

```
npm i jiraff
```

Create `.jiraff` (json) config file:

```json
{
    "protocol": "https",
    "host": "example.com",
    "port": "8081",
    "username": "vitkarpov",
    "password": "***"
}
```

## Use via CLI

Ensure that a path to the jiraff's executable (`./node_modules/.bin`) is included in your PATH environment variable.

```
> export PATH=./node_modules/.bin:$PATH
```

Now you can search project using filter:

```
> jiraff search -q "project=jiraff AND status in (open, resolved)" > issues.json
```

Jiraff writes the result to the standart output (issue.json in this case)

## Use in nodejs

Here's a simple example:

```javascript
// create a new Jiraff's instance
var jiraff = new (require('jiraff'))({
    protocol: "https",
    host: "jira.yandex-team.ru",
    port: "8081",
    username: ...,
    password: ...
});

// now Jiraff's API available in jiraff object
jiraff.auth().then(onSuccess, onFail)

function onSuccess() {
    // yep, we're in

    jiraff.search({
        q: 'project=jiraff AND status in (open, resolved)'
    })
        .then(processSearchResults)
}

function onFail(message) {
    console.log(message);
    // --> Authentication failed. Status: 401
}

function processSearchResults(data) {
    console.log(data);
    // --> {total: 25, issues: [{..}, {...}], ...}
}
```

# API

## Interface

All methods should implement [Promise/A+ interface](http://promisesaplus.com/). Each method's name is equal to the corresponding Jira's one.

## Implemented methods

Auth

```javascript
/**
 * You can specify extra settings
 * The same items defined with constructor will be overriden
 * @param {Object} settings
 *      username: {String}
 *      password: {String}
 */
jiraff.auth(settings);
```

Search

```javascript
/**
 * @param {Object} settings
 *      q {String} JQL search query
 */
jiraff.search({
    q: 'project=jiraff AND status in (open, resolved)'
}).then(function(response) {
    // log: {total: 25, issues: [...], ...}
    console.log(response)
})
```

Issue

```javascript
/**
 * @param {Object} settings
        q {String} issue's id or key
 */
jiraff.issue({
    q: 'my-issue-key'
}).then(function(response) {
    // log: {id: "123954", key: "my-issue-key", "summary": "There's some description here, yep!"}
    console.log(response);
});
```

## Test

Code is under `mocha` for describing tests, `sinonjs` for stubbing requests and `shouldjs` for assertions.

Run tests:
```
gulp test
```

# Contributing

If you'd like to implement some more methods from Jira's HTTP API you're welcome!

* [Find a method](https://docs.atlassian.com/jira/REST/latest/) you'd like to implement;
* fork the repo;
* make an issue, look at the number — it's needed for a new feature's branch name;
* checkout to the new branch `issue#...-implement-...-method`;
* make pull request and wait some feedback. Thank you!

# TODO

* doc generator from markdown
