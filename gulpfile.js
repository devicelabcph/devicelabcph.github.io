var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function () {
    gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/*js')
        .pipe(gulp.dest('/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('compile', ['sass', 'js']);

gulp.task('default', ['sass', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['js']);
    gulp.watch("*.html", ['bs-reload']);
});
