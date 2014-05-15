# [gulp](http://gulpjs.com)-litmus [![Build Status](https://travis-ci.org/jeremypeter/gulp-litmus.svg?branch=master)](https://travis-ci.org/jeremypeter/gulp-litmus)

> Lorem ipsum


## Install

```bash
$ npm install --save-dev gulp-litmus
```


## Usage

```js
var gulp = require('gulp');
var litmus = require('gulp-litmus');

gulp.task('default', function () {
	return gulp.src('src/app.ext')
		.pipe(litmus())
		.pipe(gulp.dest('dist'));
});
```


## API

### litmus(options)

#### options

##### foo

Type: `Boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Jeremy Peter](https://github.com/jeremypeter)
