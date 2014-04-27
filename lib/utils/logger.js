var log = require('color-terminal');

function logger() {
    var args = Array.prototype.slice.call(arguments);

    if (!process.stdout.isTTY) {
        return;
    }

    log
        .color(args[1] || 'magenta')
        .write(args[0] + '\n')
        .reset();
}

module.exports = logger;