var gulp = require('gulp');
var mocha = require('gulp-mocha');

var paths = {
    test: ['test/**/*.js']
};

gulp.task('test', function () {
    gulp.src(paths.test)
        .pipe(mocha({reporter: 'spec'}));
});