var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

/* Minify 'bundle.js'. If it doesn't exist, create
 * it first using concat:js.
 */
gulp.task('minify:js', ['concat:js'], function() {
  return gulp.src('./bundle/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./bundle/'))
});

/* Minify 'bundle.css'. If it doesn't exist, create
 * it first using concat:css.
 */
gulp.task('minify:css', ['concat:css'], function() {
  return gulp.src('./bundle/bundle.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./bundle/'))
});

