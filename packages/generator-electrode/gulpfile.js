'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var gulpIgnore = require('gulp-ignore');

function excludeTemplates() {
  return gulpIgnore.exclude(['**/templates/**', '**/node_modules/**']);
}

gulp.task('static', function () {
  return gulp.src(['*.js', 'test/**/*.js', 'generators/**/*.js'])
    .pipe(excludeTemplates())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('generators/**/*.js')
    .pipe(excludeTemplates())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test']);
