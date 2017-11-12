'use strict';

var gulp = require('gulp');

gulp.task('clean', function (cb) {
    require('rimraf')('z', cb);
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    var sass = require('gulp-sass');

    return gulp.src('app/scss/*.scss')
        .pipe(sass({
            precision: 10
        }))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('images', function () {
    var cache = require('gulp-cache'),
        imagemin = require('gulp-imagemin');

    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
    return gulp.src('app/styles/fonts/*')
        .pipe(gulp.dest('dist/styles/fonts'));
});

gulp.task('styles', function () {
    return gulp.src('app/styles/*.css')
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('javascript', function () {
    return gulp.src('app/scripts/*.js')
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('misc', function () {
    return gulp.src([
            'app/*.{ico,png,txt}',
            'app/.htaccess'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('html', ['sass'], function () {
    var uglify = require('gulp-uglify'),
        minifyCss = require('gulp-minify-css'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/scss/**/*.scss')
        .pipe(wiredep({directory: 'app/bower_components'}))
        .pipe(gulp.dest('dist/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic(__dirname))
        .use(serveIndex(__dirname));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect'], function () {
    var livereload = require('gulp-livereload');

    livereload.listen();

    require('opn')('http://localhost:9000');

    // watch for changes
    gulp.watch([
        '*.html',
        'styles/**/*.css',
        'scripts/**/*.js',
        'images/**/*'
    ]).on('change', livereload.changed);

    // gulp.watch('app/scss/**/*.scss', ['sass']);
    // gulp.watch('bower.json', ['wiredep']);
});


gulp.task('build', ['clean', 'lint', 'html', 'images', 'fonts', 'misc', 'styles', 'javascript']);

gulp.task('wire', ['wiredep']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
