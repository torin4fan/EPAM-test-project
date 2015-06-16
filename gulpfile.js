var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    less = require('gulp-less'),
    path = require('path'),
    clean = require('gulp-clean');


//less
gulp.task('less', function () {
    return gulp.src('app/less/includes.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('app/css'));
});


//clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});


//build
gulp.task('build', ['clean'], function () {
    var assets = useref.assets();

    gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));

    gulp.src('app/img/*')
        .pipe(gulp.dest('dist/img/'));

    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts/'));
});



gulp.task('watch', function () {
    gulp.watch('app/less/*.less', ['less'])
});

