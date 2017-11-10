/**
 * Created by Administrator on 2017/8/25.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass');
var version =( + new Date())
gulp.task('game', function () {
    return gulp.src(['site_media/sass/index/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('site_media/css/index'))
})

gulp.task('default', function () {
    gulp.watch('site_media/sass/index/*.scss', ['game'])
})
