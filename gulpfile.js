const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');

function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('./dist/css'));
}


function images() {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dist/images'));
}

function html() {
    return gulp.src('./*.html')
    .pipe(gulp.dest('./dist'));
}

exports.default =gulp.parallel(styles, images, html);
exports.watch = function() {
    gulp.watch('./src/styles/*.scss', gulp.parallel(styles))
    gulp.watch('./*.html', gulp.parallel(html));
};