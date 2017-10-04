var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', function() {
    return gulp.src('views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('views/build'))
})