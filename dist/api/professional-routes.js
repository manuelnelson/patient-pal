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
.get(_controllers.ProfessionalCtrl.list)

/** POST /api/users - Create new user */
//new professionals only created through user controller.
.post(_controllers.ProfessionalCtrl.create);
// .post(validate(paramValidation.createUser), ProfessionalCtrl.create);

router.route('/:userId')
/** GET /api/users/:email - Get user */
.get(_controllers.AuthCtrl.verifyToken, _controllers.ProfessionalCtrl.get)

/** PUT /api/users/:userId - Update user */
.put(_controllers.AuthCtrl.verifyToken, _controllers.ProfessionalCtrl.update)

/** DELETE /api/users/:email - Delete user */
//have to delete professional through user route
.delete(_controllers.AuthCtrl.verifyToken, _controllers.ProfessionalCtrl.remove);

router.route('/:userId/appointments').get(_controllers.AuthCtrl.verifyToken, _controllers.ProfessionalCtrl.getAppointments);
/** Load user when API with userId route parameter is hit */
router.param('userId', _controllers.ProfessionalCtrl.load);

router.route('/search/:keyword')
/** GET /api/skills/search/:keyword - search skills */
.get(_controllers.ProfessionalCtrl.search);

exports.default = router;
//# sourceMappingURL=professional-routes.js.map