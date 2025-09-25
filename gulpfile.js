const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


// Copiar HTML para dist
function html() {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
}

// Compilar SCSS para CSS minificado
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
}

// Copiar imagens
function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// Concatenar e minificar JS
function scripts() {
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}

// Task build
const build = gulp.parallel(html, styles, images, scripts);

exports.html = html;
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.build = build;
exports.default = build;
