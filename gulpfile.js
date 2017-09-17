const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

gulp.task('minify-css',() => {
  return gulp.src('./assets/src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/dist/css'));
});

gulp.task('imagemin', () => 
	gulp.src('./assets/src/images/*')
		.pipe(imagemin([
    	imagemin.gifsicle({interlaced: true}),
    	imagemin.jpegtran({progressive: true}),
    	imagemin.optipng({optimizationLevel: 5}),
    	imagemin.svgo({plugins: [{removeViewBox: true}]})
		]))
		.pipe(gulp.dest('./assets/dist/images'))
);

gulp.task('watch', function() {
	gulp.watch('./assets/src/css/*.css', ['minify-css']);
});

gulp.task('default', ['minify-css', 'imagemin', 'watch']);