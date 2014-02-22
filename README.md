# Nodejs wrapper for JIRA's REST API

**Jiraff** is nodejs module which provides a simple wrapper for JIRA's REST API. You can use it as module itself and via CLI.

[Original JIRA API](https://docs.atlassian.com/jira/REST/latest/)

## Install

```
npm i jiraff
```

create `.jiraff` config file contains json:

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

Ensure that the path to the jiraff executable (`./node_modules/.bin`) is included in your PATH environment variable.

```
> export PATH=./node_modules/.bin:$PATH
```

For instance, you can search project using filter:

```
> jiraff search -q="project = jiraff AND status in (open, resolved)"
```

## Use as nodejs module

Create new jiraff's instance:

```
var jiraff = new (require('jiraff'))({
    protocol: "https",
    host: "jira.yandex-team.ru",
    port: "8081",
    username: ...,
    password: ...,
    "debug": false
});
```

now it's time to call some api:

```
jiraff.auth().then(onSucces, onFail)

function onSuccess() {
    // yep, we're in
}

function onFail(message) {
    // log: Authentication failed. Status: 401
    console.log(message)
}
```

# API

## Interface

All methods should implement [Promise/A+ interface](http://promisesaplus.com/). Methods' names equals to Jira's HTTP API.

## Implemented methods

There're only two methods implemented:

```
/**
 * You can specify extra settings
 * The same items defined with constructor will be overriden
 * @param {Object} settings
 *      username: {String}
 *      password: {String}
 */
jiraff.auth(settings);
```

/**
 * @param {Object} settings
 *      q {String} search query in [JQL formatt](https://confluence.atlassian.com/display/JIRA/Advanced+Searching)
 */
```
jiraff.search({
    q: '...'
})
```

# Contributing

If you'd like to implement some methods from Jira HTTP API you're welcome!

* [Find a method](https://docs.atlassian.com/jira/REST/latest/) you'd like to implement;
* fork the repo;
* make an issue, look at it's number — it's needed for a new feature branch name;
* checkout to the new branch `issue#...-implement-...-method`;
* make pull request and wait a feedback. Thank you!

# TODO

* doc generator from markdown
* tests!
* travis CI
