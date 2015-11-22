var gulp = require('gulp');
var del = require('del');

/* Removes the generated 'bundle' folder.
 */
gulp.task('clean', function(cb) {
  del('./bundle/', cb);
});
