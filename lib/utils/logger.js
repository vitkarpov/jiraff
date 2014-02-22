'use strict';

var log = require('color-terminal');

function logger() {
    var args = Array.prototype.slice.call(arguments);

    if (!this.debug) {
        return;
    }

    log
        .color(args[1] || 'magenta')
        .write(args[0] + '\n')
        .reset();
}

module.exports = logger;