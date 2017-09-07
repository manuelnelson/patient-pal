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

var _userController = require('../controllers/user-controller');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
.get(_userController2.default.list)

/** POST /api/users - Create new user */
.post((0, _expressValidation2.default)(_userValidation2.default.createUser), _userController2.default.create);

router.route('/:userId')
/** GET /api/users/:userId - Get user */
.get(_userController2.default.get)

/** PUT /api/users/:userId - Update user */
.put((0, _expressValidation2.default)(_userValidation2.default.updateUser), _userController2.default.update)

/** DELETE /api/users/:userId - Delete user */
.delete(_userController2.default.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', _userController2.default.load);

exports.default = router;
//# sourceMappingURL=user-routes.js.map