'use strict';

var normalize = require('normalize-path');
var bundleScripts = require('./lib/bundle-scripts');
var bundleStyles = require('./lib/bundle-styles');
var async = require('async');
var path = require('path');
var livereload = require('./lib/livereload');

function fosify(opts) {
  var currentPath = path.resolve(process.cwd());

  opts = opts || {};

  opts.source = normalize(opts.source || './');
  opts.dest = path.join(currentPath, opts.dest || './build');

  async.applyEachSeries([bundleScripts, bundleStyles], opts, function(err) {
    if (opts.livereload) {
      livereload(opts);
    }
  });
}

module.exports = fosify;
