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
/** GET /api/masteredSkills - Get list of masteredSkills */
.get(function (req, res, next) {
  return _controllers.MasteredSkillCtrl.list(req, res, next).then(function (masteredSkills) {
    return res.json(masteredSkills);
  });
})

/** POST /api/masteredSkills - Create new masteredSkill */
.post(function (req, res, next) {
  return _controllers.MasteredSkillCtrl.create(req, res, next).then(function (masteredSkill) {
    return res.json(masteredSkill);
  });
});
//.post(AuthCtrl.verifyToken,MasteredSkillCtrl.create);
// .post(validate(paramValidation.createUser), MasteredSkillCtrl.create);

router.route('/:id')
/** GET /api/masteredSkills/:id - Get masteredSkill */
.get(function (req, res, next) {
  return res.json(_controllers.MasteredSkillCtrl.get(req, res, next));
})

/** PUT /api/masteredSkills/:id - Update masteredSkill */
.put(function (req, res, next) {
  return _controllers.MasteredSkillCtrl.update(req, res, next).then(function (masteredSkill) {
    return res.json(masteredSkill);
  });
})

/** DELETE /api/masteredSkills/:id - Delete masteredSkill */
.delete(function (req, res, next) {
  return _controllers.MasteredSkillCtrl.remove(req, res, next).then(function (masteredSkill) {
    return res.json(masteredSkill);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.MasteredSkillCtrl.load);

exports.default = router;
//# sourceMappingURL=mastered-skill-routes.js.map