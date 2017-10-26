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

router.route('/login')
/** POST /api/auth/login - Create new user */
.post((0, _expressValidation2.default)(_userValidation2.default.login), _controllers.AuthCtrl.login);

router.route('/update/:email')
//TODO: require hash from email to update password
.put(_controllers.AuthCtrl.updatePassword);

router.route('/forgot-password')
//TODO: require hash from email to update password
.post(function (req, res, next) {
  return _controllers.AuthCtrl.forgotPassword(req, res, next).then(function (message) {
    if (message) res.json(message);
  });
});
// router.route('/:userId')
//   /** GET /api/users/:userId - Get user */
//   .get(AuthCtrl.get)
//
//   /** PUT /api/users/:userId - Update user */
//   .put(validate(paramValidation.updateUser), AuthCtrl.update)
//
//   /** DELETE /api/users/:userId - Delete user */
//   .delete(AuthCtrl.remove);
//
// /** Load user when API with userId route parameter is hit */
// router.param('userId', AuthCtrl.load);

exports.default = router;
//# sourceMappingURL=auth-routes.js.map