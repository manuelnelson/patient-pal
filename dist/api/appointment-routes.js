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
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.AppointmentCtrl.list(req, res, next).then(function (appointments) {
    return res.json(appointments);
  });
})

/** POST /api/appointments - Create new appointment */
.post(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.AppointmentCtrl.create(req, res, next).then(function (appointment) {
    return res.json(appointment);
  });
});
//.post(AuthCtrl.verifyToken,AppointmentCtrl.create);
// .post(validate(paramValidation.createUser), AppointmentCtrl.create);

router.route('/:id')
/** GET /api/appointments/:id - Get appointment */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.AppointmentCtrl.get(req, res, next));
})

/** PUT /api/appointments/:id - Update appointment */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.AppointmentCtrl.update(req, res, next).then(function (appointment) {
    return res.json(appointment);
  });
})

/** DELETE /api/appointments/:id - Delete appointment */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.AppointmentCtrl.remove(req, res, next).then(function (appointment) {
    return res.json(appointment);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.AppointmentCtrl.load);

exports.default = router;
//# sourceMappingURL=appointment-routes.js.map