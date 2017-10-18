'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _skillValidation = require('../config/skill-validation');

var _skillValidation2 = _interopRequireDefault(_skillValidation);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/skills - Get list of skills */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.SkillCtrl.list(req, res, next).then(function (skills) {
    return res.json(skills);
  });
})

/** POST /api/skills - Create new skill */
.post(_controllers.AuthCtrl.verifyToken, (0, _expressValidation2.default)(_skillValidation2.default.createSkill), function (req, res, next) {
  return _controllers.SkillCtrl.create(req, res, next).then(function (skill) {
    return res.json(skill);
  });
});
//.post(AuthCtrl.verifyToken,SkillCtrl.create);
// .post(validate(paramValidation.createUser), SkillCtrl.create);

router.route('/:id')
/** GET /api/skills/:id - Get skill */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.SkillCtrl.get(req, res, next));
})

/** PUT /api/skills/:id - Update skill */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.SkillCtrl.update(req, res, next).then(function (skill) {
    return res.json(skill);
  });
})

/** DELETE /api/skills/:id - Delete skill */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.SkillCtrl.remove(req, res, next).then(function (skill) {
    return res.json(skill);
  });
});

router.route('/search/:keyword')
/** GET /api/skills/search/:keyword - search skills */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.SkillCtrl.search(req, res, next).then(function (skills) {
    return res.json(skills);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.SkillCtrl.load);

exports.default = router;
//# sourceMappingURL=skill-routes.js.map