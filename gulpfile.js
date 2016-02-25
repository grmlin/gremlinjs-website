var gulp = require('gulp');
var browserify = require('browserify');
var mold = require('mold-source-map');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var exorcist = require('exorcist');
var uglifyify = require('uglifyify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {

	return browserify('./src/index.js', {
		extensions: ['.js', '.jsx', '.json'],
		debug: true
	})
		.transform('babelify')
		.bundle()
		.pipe(mold.transformSourcesRelativeTo('./'))
		//.pipe(exorcist('./custom_theme/js/index.js.map'))
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		//.pipe(uglify({
		//	outSourceMap: true
		//}))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./themes/yeti/js'));
});

gulp.task('watch', function () {
	gulp.watch(['src/**/*.*'], ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);