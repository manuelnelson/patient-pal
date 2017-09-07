'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _package = require('../../package.json');

var _express = require('express');

var _userRoutes = require('./user-routes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount user routes at /users
	api.use('/users', _userRoutes2.default);

	// perhaps expose some API metadata at the root
	api.get('/', function (req, res) {
		res.json({ version: _package.version });
	});

	return api;
};
//# sourceMappingURL=index.js.map