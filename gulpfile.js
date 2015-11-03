
// Require
// -------

var del          = require('del'),
    gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    scsslint     = require('gulp-scsslint');

// Paths
// -----

var css     = 'assets/dist/css',
    nodeDir = 'node_modules/',
    styles  = 'assets/src/styles/**/*.scss';

// Clean
// -----

gulp.task('clean', function (cb) {
  del(['assets/dist/css/**/*'], cb);
});

// Default
// -------

gulp.task('default', ['clean', 'styles']);

// Sass lint
// ---------

gulp.task('scsslint', function() {
  return gulp.src(styles)
    .pipe(scsslint('assets/src/styles/.scss-lint.yml'))
    .pipe(scsslint.reporter());
});

// Styles
// ------

gulp.task('styles', function() {
  return gulp.src(styles)
    .pipe(sass({
      includePaths: [
        'node_modules'
      ],
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(css));
});

// Watch
// -----

gulp.task('watch', function() {
  gulp.watch(styles, ['styles']);
});
