'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (callback) {
	_mongoose2.default.connect('mongodb://localhost/boilerplate');
	var db = _mongoose2.default.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function () {
		// we're connected!
		callback(db);
	});
};
//# sourceMappingURL=db.js.map