'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _skillDataValidation = require('../config/skill-data-validation');

var _skillDataValidation2 = _interopRequireDefault(_skillDataValidation);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/skillDatas - Get list of skillDatas */
.get(function (req, res, next) {
  return _controllers.SkillDataCtrl.list(req, res, next).then(function (skillDatas) {
    return res.json(skillDatas);
  });
})

/** POST /api/skillDatas - Create new skillData */
.post(_controllers.AuthCtrl.verifyToken, (0, _expressValidation2.default)(_skillDataValidation2.default.createSkillData), function (req, res, next) {
  return _controllers.SkillDataCtrl.create(req, res, next).then(function (skillData) {
    return res.json(skillData);
  });
});
//.post(AuthCtrl.verifyToken,SkillDataCtrl.create);
// .post(validate(paramValidation.createUser), SkillDataCtrl.create);

router.route('/:id')
/** GET /api/skillDatas/:id - Get skillData */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.SkillDataCtrl.get(req, res, next));
})

/** PUT /api/skillDatas/:id - Update skillData */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.SkillDataCtrl.update(req, res, next).then(function (skillData) {
    return res.json(skillData);
  });
})

/** DELETE /api/skillDatas/:id - Delete skillData */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.SkillDataCtrl.remove(req, res, next).then(function (skillData) {
    return res.json(skillData);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.SkillDataCtrl.load);

exports.default = router;
//# sourceMappingURL=skill-data-routes.js.map