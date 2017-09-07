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
/** GET /api/appointments - Get list of appointments */
.get(_controllers.AppointmentCtrl.list)

/** POST /api/appointments - Create new appointment */
.post(_controllers.AuthCtrl.verifyToken, _controllers.AppointmentCtrl.create);
// .post(validate(paramValidation.createUser), AppointmentCtrl.create);

router.route('/:id')
/** GET /api/appointments/:id - Get appointment */
.get(_controllers.AppointmentCtrl.get)

/** PUT /api/appointments/:id - Update appointment */
.put(_controllers.AppointmentCtrl.update)

/** DELETE /api/appointments/:id - Delete appointment */
.delete(_controllers.AppointmentCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.AppointmentCtrl.load);

exports.default = router;
//# sourceMappingURL=appointment-routes.js.map