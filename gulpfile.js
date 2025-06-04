'use strict';
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const browsersync = require('browser-sync').create();
var paths = {
	styles: {
		src: 'assets/scss/**/*.scss',
		dest: 'assets/css'
	}
}
function scssTask() {
	return src(paths.styles.src)
		.pipe(sass({
			outputStyle: 'compressed',
			quietDeps: true
		}).on('error', sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(dest(paths.styles.dest));
}
exports.scssTask = scssTask
// Browsersync Tasks
function browsersyncServe(cb){
	browsersync.init({
		server: {
			baseDir: '.'
		}
	});
	cb();
}

function browsersyncReload(cb){
	browsersync.reload();
	cb();
}
// Watch Task
function watchTask(){
	watch('**/*.html', browsersyncReload);
	watch([paths.styles.src], series(scssTask, browsersyncReload));
}
// Default Gulp task
exports.watch = series(
	scssTask,
	browsersyncServe,
	watchTask
);