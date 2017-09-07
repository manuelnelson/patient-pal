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
/** GET /api/dttTypes - Get list of dttTypes */
.get(_controllers.DttTypeCtrl.list)

/** POST /api/dttTypes - Create new dttType */
.post(_controllers.AuthCtrl.verifyToken, _controllers.DttTypeCtrl.create);
// .post(validate(paramValidation.createUser), DttTypeCtrl.create);

router.route('/:id')
/** GET /api/dttTypes/:id - Get dttType */
.get(_controllers.DttTypeCtrl.get)

/** PUT /api/dttTypes/:id - Update dttType */
.put(_controllers.DttTypeCtrl.update)

/** DELETE /api/dttTypes/:id - Delete dttType */
.delete(_controllers.DttTypeCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.DttTypeCtrl.load);

exports.default = router;
//# sourceMappingURL=dtt-type-routes.js.map