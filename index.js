'use strict';
var gutil = require('gulp-util');
var es = require('event-stream');
var module = require('module');

module.exports = function (options) {
	if (!options.foo) {
		throw new gutil.PluginError('gulp-litmus', '`foo` required');
	}

	return es.map(function (file, cb) {
		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-litmus', 'Streaming not supported'));
			return cb();
		}

		try {
			file.contents = new Buffer(module(file.contents.toString(), options));
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-litmus', err));
		}

		cb(null, file);
	});
};
