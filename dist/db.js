'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _targetType = require('./seed/targetType');

var _targetType2 = _interopRequireDefault(_targetType);

var _dttType = require('./seed/dttType');

var _dttType2 = _interopRequireDefault(_dttType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
	_mongoose2.default.Promise = require('bluebird');
	var mongoUri = process.env.MONGODB_URI || process.env.MONGO_HOST;
	_mongoose2.default.connect(mongoUri);
	var db = _mongoose2.default.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		//check update scripts
		_targetType2.default.any().then(function (targets) {
			return _targetType2.default.run(targets);
		});

		_dttType2.default.any().then(function (ddts) {
			return _dttType2.default.run(ddts);
		});

		// we're connected!
		callback(db);
	});
};
//# sourceMappingURL=db.js.map