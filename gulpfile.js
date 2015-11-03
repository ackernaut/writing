
// Load plugins
// ------------

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    size = require('gulp-size'),
    rename = require('gulp-rename'),
    css = require('css'),
    browserSync = require('browser-sync'),
    browserReload = browserSync.reload;

gulp.task('css', function() {
  gulp.src('./src/tachyons.css')
    .pipe(size({gzip: false, showFiles: true, title:'basswork css'}))
    .pipe(size({gzip: true, showFiles: true, title:'basswork gzipped css'}))
    .pipe(gulp.dest('./css'))
    .pipe(minifycss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(size({gzip: false, showFiles: true, title:'basswork minified'}))
    .pipe(size({gzip: true, showFiles: true, title:'basswork minified'}))
    .pipe(gulp.dest('./css'));
});

// Initialize browser-sync which starts a static server also allows for
// browsers to reload on filesave
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./"
        }
    });
});

// Function to call for reloading browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/*
   DEFAULT TASK

 • Process css then auto-prefixes and lints outputted css
 • Starts a server on port 3000
 • Reloads browsers when you change html or sass files

*/
gulp.task('default', ['css', 'bs-reload', 'browser-sync'], function(){
  gulp.start(['css', 'bs-reload']);
  gulp.watch('src/*', ['css']);
  gulp.watch(['*.html', './**/*.html'], ['bs-reload']);
});
