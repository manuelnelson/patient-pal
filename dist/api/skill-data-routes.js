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
/** GET /api/skillDatas - Get list of skillDatas */
.get(_controllers.SkillDataCtrl.list)

/** POST /api/skillDatas - Create new skillData */
.post(_controllers.AuthCtrl.verifyToken, _controllers.SkillDataCtrl.create);
// .post(validate(paramValidation.createUser), SkillDataCtrl.create);

router.route('/:id')
/** GET /api/skillDatas/:id - Get skillData */
.get(_controllers.SkillDataCtrl.get)

/** PUT /api/skillDatas/:id - Update skillData */
.put(_controllers.SkillDataCtrl.update)

/** DELETE /api/skillDatas/:id - Delete skillData */
.delete(_controllers.SkillDataCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.SkillDataCtrl.load);

exports.default = router;
//# sourceMappingURL=skill-data-routes.js.map