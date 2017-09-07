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
/** GET /api/skills - Get list of skills */
.get(_controllers.SkillCtrl.list)

/** POST /api/skills - Create new skill */
.post(_controllers.AuthCtrl.verifyToken, _controllers.SkillCtrl.create);

router.route('/:id')
/** GET /api/skills/:id - Get skill */
.get(_controllers.SkillCtrl.get)

/** PUT /api/skills/:id - Update skill */
.put(_controllers.SkillCtrl.update)

/** DELETE /api/skills/:id - Delete skill */
.delete(_controllers.SkillCtrl.remove);

router.route('/search/:keyword')
/** GET /api/skills/search/:keyword - search skills */
.get(_controllers.SkillCtrl.search);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.SkillCtrl.load);

exports.default = router;
//# sourceMappingURL=skill-routes.js.map