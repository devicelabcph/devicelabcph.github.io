var fs = require('fs');
var gulp = require('gulp');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var swig = require('gulp-swig');
//var jade = require('gulp-jade');
var browserSync = require('browser-sync');

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
});

gulp.task('sass', function () {
    gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/*js')
        .pipe(gulp.dest('./js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('swig', function() {
    var viewData = {
        devices: JSON.parse(fs.readFileSync('./src/devices.json', {encoding:'utf8'}))
    };
    gulp.src('./src/**/*.html')
        .pipe(swig({
            locals: viewData
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('templates', function() {
  gulp.src('./src/**/*.html')
    .pipe(swig({
        defaults: { cache: false }
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('compile', ['sass', 'js', 'templates']);


gulp.task('default', ['sass', 'js', 'templates', 'browser-sync'], function () {
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch(["src/*.html"], ['templates']);
    gulp.watch("*.html", ['bs-reload']);
});
