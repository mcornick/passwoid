'use strict';

var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var ava = require('gulp-ava');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var coveralls = require('gulp-coveralls');
var alex = require('gulp-alex');

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
  nsp({package: path.join(__dirname, '/package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('lib/**/*.js')
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function () {
  return gulp.src('test/**/*.js')
    .pipe(ava());
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
