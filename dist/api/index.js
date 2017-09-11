'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _userRoutes = require('./user-routes');

var _userRoutes2 = _interopRequireDefault(_userRoutes);

var _authRoutes = require('./auth-routes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

var _clientRoutes = require('./client-routes');

var _clientRoutes2 = _interopRequireDefault(_clientRoutes);

var _professionalRoutes = require('./professional-routes');

var _professionalRoutes2 = _interopRequireDefault(_professionalRoutes);

var _appointmentRoutes = require('./appointment-routes');

var _appointmentRoutes2 = _interopRequireDefault(_appointmentRoutes);

var _targetTypeRoutes = require('./target-type-routes');

var _targetTypeRoutes2 = _interopRequireDefault(_targetTypeRoutes);

var _dttTypeRoutes = require('./dtt-type-routes');

var _dttTypeRoutes2 = _interopRequireDefault(_dttTypeRoutes);

var _skillRoutes = require('./skill-routes');

var _skillRoutes2 = _interopRequireDefault(_skillRoutes);

var _curriculumRoutes = require('./curriculum-routes');

var _curriculumRoutes2 = _interopRequireDefault(_curriculumRoutes);

var _clientCurriculumRoutes = require('./client-curriculum-routes');

var _clientCurriculumRoutes2 = _interopRequireDefault(_clientCurriculumRoutes);

var _skillDataRoutes = require('./skill-data-routes');

var _skillDataRoutes2 = _interopRequireDefault(_skillDataRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { version } from '../../../package.json';
exports.default = function (_ref) {
	var config = _ref.config,
	    db = _ref.db;

	var api = (0, _express.Router)();

	// mount user routes at /users
	api.use('/users', _userRoutes2.default);
	api.use('/auth', _authRoutes2.default);
	api.use('/clients', _clientRoutes2.default);
	api.use('/professionals', _professionalRoutes2.default);
	api.use('/appointments', _appointmentRoutes2.default);
	api.use('/targettypes', _targetTypeRoutes2.default);
	api.use('/dtttypes', _dttTypeRoutes2.default);
	api.use('/skills', _skillRoutes2.default);
	api.use('/curriculums', _curriculumRoutes2.default);
	api.use('/clientcurriculums', _clientCurriculumRoutes2.default);
	api.use('/skilldatas', _skillDataRoutes2.default);

	// perhaps expose some API metadata at the root
	// api.get('/', (req, res) => {
	// 	res.json({ version });
	// });

	return api;
};
//# sourceMappingURL=index.js.map