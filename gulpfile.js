'use strict';

const browserSync = require("browser-sync");
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('images', () => {
    gulp.src('./public/images/**/*.*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./immigrnt.min/public/images'))
});

gulp.task('imagesCss', () => {
    gulp.src('./public/assets/css/images/**/*.*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./public/assets/css/images'))
});

gulp.task('javascript', () => {
    gulp.src('./public/assets/js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('./immigrnt.min/public/assets/js'))
});

gulp.task('css', () => {
    gulp.src('./public/assets/css/**/**.css')
        .pipe(plumber())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('./immigrnt.min/public/assets/css'))
});

gulp.task('sass', function() {
    gulp.src('./public/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./immigrnt.min/public/assets/sass'));
});

gulp.task('sass_libs', function() {
    gulp.src('./public/assets/sass/libs/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./immigrnt.min/public/assets/sass/libs'));
});

gulp.task('hbs', function() {
    gulp.src('./views/**/*.hbs')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./immigrnt.min/views'));
});

gulp.task('watch', () => {
    gulp.watch('./public/assets/css/**/*.css', ['css', 'imagesCss']);
    gulp.watch('./public/assets/js/**/*.js', ['javascript']);
    gulp.watch('./views/**/*.hbs', ['hbs']);
    gulp.watch('./public/images', ['images']);
});

gulp.task('serve', ['watch', 'nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:2000",
        files: ["./public/assets/**/*.*", "./views/**/*.hbs"],
        browser: "google chrome" || "safari",
        port: 7000
    });
});

gulp.task('nodemon', function(cb) {
    var started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', function() {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('minify', ['sass', 'css', 'javascript', 'hbs', 'images', 'imagesCss']);

gulp.task('default', ['minify', 'serve']);
