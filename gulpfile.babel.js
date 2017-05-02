var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');
var $ = require('gulp-load-plugins')();


var PathsBackend = {
  es6: ['./src/**/*.js'],
  es5: './tests',
  sourceRoot: path.join(__dirname, 'src')
};

gulp.task('BabelTests', function() {
  return gulp
    .src(PathsBackend.es6)
    .pipe(sourceMaps.init())
    .pipe($.babel({
      presets: ['es2015'] ,
      plugins: [
        'syntax-async-functions',
        'transform-regenerator'
      ]
    }))
    .pipe(sourceMaps.write('.', { sourceRoot: PathsBackend.sourceRoot }))
    .pipe(gulp.dest(PathsBackend.es5));
});
gulp.task('watchTests', function() {
  gulp.watch([PathsBackend.es6], ['BabelTests'])
});


gulp.task('default', ['BabelTests', 'watchTests']);