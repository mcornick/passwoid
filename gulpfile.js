'use strict';

var alex = require('gulp-alex');
var coveralls = require('gulp-coveralls');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');
var path = require('path');
var plumber = require('gulp-plumber');

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('alex', function () {
  return gulp.src('*.md')
    .pipe(alex())
    .pipe(alex.reporter())
    .pipe(alex.reporter('fail'));
});

gulp.task('nsp', function (cb) {
  nsp({package: __dirname + '/package.json'}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(istanbul({includeUntested: true}))
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
  gulp.watch('**/*.js', ['test']);
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }
  gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'alex', 'test', 'coveralls']);
