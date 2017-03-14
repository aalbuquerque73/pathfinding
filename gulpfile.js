'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

const server = browserSync.create('dev-server');

gulp.task('build', function () {
	return browserify({entries: './src/app.jsx', extensions: ['.jsx'], debug: true})
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.on('error', function(error) {
			console.log(Object.keys(error.loc));
			console.error(`Error in file ${error.filename} at line ${error.loc.line}, column ${error.loc.column}`);
			console.error(error.codeFrame);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist'))
		.pipe(server.stream({ once: true }));
});

gulp.task('static', function () {
	return gulp.src([ 'foundation.css', 'index.html' ])
		.pipe(gulp.dest('dist'))
		.pipe(server.stream({ once: true }));
});

gulp.task('watch', ['build', 'static'], function () {
		gulp.watch(['src/**/*.jsx', 'src/**/*.js'], ['build']);
});

gulp.task('default', ['watch', 'serve']);

gulp.task('serve', function (done) {
	server.init(
		{
			server: {
				baseDir: './',
				directory: true,
				index: 'index.html'
			},
			open: false,
			startPath: '/index.html',
			files: [ 'foundation.css', 'index.html' ]
		},
		function () {
			server.notify('Server started...');
			done();
		}
	);
});

gulp.task('reload', function () {
	server.reload();
});
