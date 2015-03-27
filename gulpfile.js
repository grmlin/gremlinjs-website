var gulp = require('gulp');
var path = require('path');
var jsRoot = path.join(__dirname, 'gremlins-website');
var through2 = require('through2');
var browserify = require('browserify');
var babelify = require("babelify");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scripts', function () {

	return gulp.src('src/index.js')
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(through2.obj(function (file, enc, next) {
				browserify(file.path, {
					debug: true
				})
				.transform('babelify')
				.bundle(function (err, res) {
					// assumes file.contents is a Buffer
					file.contents = res;
					next(null, file);
				});
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('custom_theme/js'));
});

gulp.task('watch', function () {
	gulp.watch(['src/**/*.js'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);