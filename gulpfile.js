const gulp = require("gulp");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

gulp.task('tosass', () => {
  gulp.src(["./**/*.scss"])
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCss())
  .pipe(rename((path) => {
    path.extname = '.wxss'
  }))
  .pipe(gulp.dest('./'))
})
gulp.task('watch', () => {
  gulp.watch('./components/**/*.scss', ['tosass'])
  gulp.watch('./pages/**/*.scss', ['tosass'])
})