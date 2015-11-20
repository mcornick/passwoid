'use strict';

var babel = require('gulp-babel');
var coveralls = require('gulp-coveralls');
var del = require('del');
var excludeGitignore = require('gulp-exclude-gitignore');
var gulp = require('gulp');
var isparta = require('isparta');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var nsp = require('gulp-nsp');
var path = require('path');
var plumber = require('gulp-plumber');
var xo = require('gulp-xo');

require('babel-core/register');

gulp.task('static', function () {
	return gulp.src('**/*.js')
		.pipe(excludeGitignore())
		.pipe(xo({quiet: true}));
});

gulp.task('nsp', function (cb) {
	nsp({package: path.join(__dirname, '/package.json')}, cb);
});

gulp.task('pre-test', function () {
	return gulp.src('lib/**/*.js')
		.pipe(istanbul({
			includeUntested: true,
			instrumenter: isparta.Instrumenter
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

gulp.task('coveralls', ['test'], function () {
	if (!process.env.CI) {
		return;
	}

	gulp.src(path.join(__dirname, 'coverage/lcov.info'))
		.pipe(coveralls());
});

gulp.task('babel', ['clean'], function () {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('lib'));
});

gulp.task('clean', function () {
	return del('lib');
});

gulp.task('prepublish', ['nsp', 'babel']);
gulp.task('default', ['static', 'test', 'coveralls']);
