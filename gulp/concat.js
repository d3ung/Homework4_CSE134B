var gulp = require('gulp');
var concat = require('gulp-concat');

/* Concatenate js files into a file 'bundle.js',
 * which is placed in the './bundle' folder
 */ 
gulp.task('concat:js', function() {
  return gulp.src(['./js/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./bundle/'));
});

/* Concatenate css files into a file 'bundle.css',
 * which is placed in the 'bundle' folder
 */ 
gulp.task('concat:css', function() {
  return gulp.src(['./css/**/*.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./bundle/'));
});
