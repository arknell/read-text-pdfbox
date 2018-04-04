/**
 *
 * @author ChanWoo Kwon
 * date : 2018-02-12
 */
'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

/**
 * 기본 디렉토리 구조
 * @type {{SRC: string, LIB: string, RES: string, DEST: string}}
 */
const DIR = {
	SRC: 'src',
	LIB: 'src/lib',
	RES: 'src/res',
	DEST: 'dist'
};

/**
 * 소스의 디렉토리
 * @type {{JS: string}}
 */
const SRC = {
	JS: DIR.SRC + '/**/*.js',
	package: 'package.json',
	jar: DIR.SRC + '/**/*.jar'
};

/**
 * 빌드 후 디렉토리
 * @type {{JS: string}}
 */
const DEST = {
	JS: DIR.DEST + '/',
	jar: DIR.DEST + '/'
};

/**
 * 기본 테스크 실행
 */
gulp.task('default', () => {
	
	gulp.src(SRC.jar)
	.pipe(gulp.dest(DEST.jar));
	
	return	gulp.src(SRC.JS)    // 소스 read
	.pipe(babel())              // es6 문법을 es5문법으로 교체
	.pipe(uglify())             // 압축
	.pipe(gulp.dest(DEST.JS));  // build
});