'use strict';

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpLoadPlugins = require('gulp-load-plugins');

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var plugins = (0, _gulpLoadPlugins2.default)();

var paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore', './.env'],
  tests: './server/tests/*.js'
};

// Clean up dist and coverage directory
_gulp2.default.task('clean', function () {
  return _del2.default.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage']);
});

// Copy non-js files to dist
_gulp2.default.task('copy', function () {
  return _gulp2.default.src(paths.nonJs).pipe(plugins.newer('dist')).pipe(_gulp2.default.dest('dist'));
});

// Compile ES6 to ES5 and copy to dist
_gulp2.default.task('babel', function () {
  return _gulp2.default.src([].concat(_toConsumableArray(paths.js), ['!gulpfile.babel.js']), { base: '.' }).pipe(plugins.newer('dist')).pipe(plugins.sourcemaps.init()).pipe(plugins.babel()).pipe(plugins.sourcemaps.write('.', {
    includeContent: false,
    sourceRoot: function sourceRoot(file) {
      return _path2.default.relative(file.path, __dirname);
    }
  })).pipe(_gulp2.default.dest('dist'));
});

// Start server with restart on file changes
_gulp2.default.task('nodemon', ['copy', 'babel'], function () {
  return plugins.nodemon({
    script: _path2.default.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babel']
  });
});

// gulp serve for development
_gulp2.default.task('serve', ['clean'], function () {
  return (0, _runSequence2.default)('nodemon');
});

// default task: clean dist, compile js files and copy non-js files.
_gulp2.default.task('default', ['clean'], function () {
  (0, _runSequence2.default)(['copy', 'babel']);
});
//# sourceMappingURL=gulpfile.js.map