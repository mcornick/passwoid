'use strict';

var ava = require('gulp-ava');
var babel = require('gulp-babel');
var del = require('del');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var path = require('path');

gulp.task('static', function () {
	return gulp.src('**/*.js')
		.pipe(excludeGitignore())
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
	nsp({package: path.join(__dirname, '/package.json')}, cb);
});

gulp.task('test', function () {
	return gulp.src('test/**/*.js')
		.pipe(ava());
});

gulp.task('babel', ['clean'], function () {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('lib'));
});

gulp.task('clean', function () {
	return del('lib');
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test']);
