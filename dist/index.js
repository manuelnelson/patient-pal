'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _winston = require('./config/winston');

var _winston2 = _interopRequireDefault(_winston);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _APIError = require('./lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

	//static files
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
	// logger
	if (_config2.default.env === 'development') {
		app.use((0, _morgan2.default)('dev'));
	}

	// 3rd party middleware
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use((0, _cookieParser2.default)());
	//https://github.com/expressjs/compression
	app.use((0, _compression2.default)());

	//https://github.com/helmetjs/helmet aka security add-on
	app.use((0, _helmet2.default)());

	app.use((0, _cors2.default)({
		exposedHeaders: _config2.default.corsHeaders
	}));

	// enable detailed API logging in dev env
	if (_config2.default.env === 'development') {
		_expressWinston2.default.requestWhitelist.push('body');
		_expressWinston2.default.responseWhitelist.push('body');
		app.use(_expressWinston2.default.logger({
			winstonInstance: _winston2.default,
			meta: true, // optional: log meta data about request (defaults to true)
			msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
			colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
		}));
	}
	// internal middleware
	app.use((0, _middleware2.default)({ config: _config2.default, db: db }));

	// api router
	app.use('/api', (0, _api2.default)({ config: _config2.default, db: db }));
	// api router
	app.use('/', _express2.default.static('/index.html'));

	// if error is not an instanceOf APIError, convert it.
	app.use(function (err, req, res, next) {
		if (err instanceof _expressValidation2.default.ValidationError) {
			// validation error contains errors which is an array of error each containing message[]
			var unifiedErrorMessage = err.errors.map(function (error) {
				return error.messages.join('. ');
			}).join(' and ');
			var error = new _APIError2.default(unifiedErrorMessage, err.status, true);
			return next(error);
		} else if (!(err instanceof _APIError2.default)) {
			var apiError = new _APIError2.default(err.message, err.status, err.isPublic);
			return next(apiError);
		}
		return next(err);
	});
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
		var err = new _APIError2.default('API not found', _httpStatus2.default.NOT_FOUND);
		return next(err);
	});

	// log error in winston transports except when executing test suite
	if (_config2.default.env !== 'test') {
		app.use(_expressWinston2.default.errorLogger({
			winstonInstance: _winston2.default
		}));
	}
	// error handler, send stacktrace only during development
	app.use(function (err, req, res, next) {
		return (// eslint-disable-line no-unused-vars
			res.status(err.status).json({
				message: err.isPublic ? err.message : _httpStatus2.default[err.status],
				stack: _config2.default.env === 'development' ? err.stack : {}
			})
		);
	});

	app.listen(process.env.PORT || _config2.default.port, function () {
		console.log('Started on port ' + _config2.default.port);
	});
});

exports.default = app;
//# sourceMappingURL=index.js.map