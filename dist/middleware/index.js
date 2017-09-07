'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var routes = (0, _express.Router)();

	// add middleware here
	routes.get('/', function (_ref2) {
		var req = _ref2.req,
		    res = _ref2.res;
		res.sendFile(_path2.default.resolve('dist/public/index.html'));
	});

	return routes;
};
//# sourceMappingURL=index.js.map