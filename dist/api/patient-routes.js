'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _userValidation = require('../config/user-validation');

var _userValidation2 = _interopRequireDefault(_userValidation);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
.get(_controllers.PatientCtrl.list)

/** POST /api/users - Create new user */
.post(_controllers.AuthCtrl.verifyToken, _controllers.PatientCtrl.create);
// .post(validate(paramValidation.createUser), PatientCtrl.create);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
.get(_controllers.PatientCtrl.get)

/** PUT /api/users/:userId - Update user */
.put(_controllers.PatientCtrl.update)

/** DELETE /api/users/:userId - Delete user */
.delete(_controllers.PatientCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', _controllers.PatientCtrl.load);

exports.default = router;
//# sourceMappingURL=patient-routes.js.map