var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');

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

gulp.task('jade', function() {
    var viewData = {
        devices: JSON.parse(fs.readFileSync('./src/devices.json', {encoding:'utf8'}))
    };
    gulp.src('./src/**/*.jade')
        .pipe(jade({
            locals: viewData
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('compile', ['sass', 'js', 'jade']);


gulp.task('default', ['sass', 'js', 'jade', 'browser-sync'], function () {
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch(["src/*.jade", 'src/**.json'], ['jade']);
});
