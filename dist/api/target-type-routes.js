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
/** GET /api/targetTypes - Get list of targetTypes */
.get(_controllers.TargetTypeCtrl.list)

/** POST /api/targetTypes - Create new targetType */
.post(_controllers.AuthCtrl.verifyToken, _controllers.TargetTypeCtrl.create);
// .post(validate(paramValidation.createUser), TargetTypeCtrl.create);

router.route('/:id')
/** GET /api/targetTypes/:id - Get targetType */
.get(_controllers.TargetTypeCtrl.get)

/** PUT /api/targetTypes/:id - Update targetType */
.put(_controllers.TargetTypeCtrl.update)

/** DELETE /api/targetTypes/:id - Delete targetType */
.delete(_controllers.TargetTypeCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.TargetTypeCtrl.load);

exports.default = router;
//# sourceMappingURL=target-type-routes.js.map