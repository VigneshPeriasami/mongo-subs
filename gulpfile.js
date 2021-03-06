'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var browserify = require('gulp-browserify');

gulp.task('lint', function() {
  return gulp.src(['lib/src/**/*.js', 'lib/test/**/*.js',
    'example/**/*.js', '!**/node_modules/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function() {
  return gulp.src('lib/test/**/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('build-example', function() {
  return gulp.src('example/client/mongolisten.js').pipe(browserify())
    .pipe(gulp.dest('./example/public/dist'));
});

gulp.task('check', function(callback) {
  runSequence('lint', 'test', callback);
});

gulp.task('default', ['check']);
