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
.get(function (req, res, next) {
  return _controllers.SkillDataCtrl.list(req, res, next).then(function (skillDatas) {
    return res.json({ skillDatas: skillDatas });
  });
})

/** POST /api/skillDatas - Create new skillData */
.post(function (req, res, next) {
  _controllers.SkillDataCtrl.create(req, res, next).then(function (skill) {
    return res.json(skill);
  });
});

// .post(validate(paramValidation.createUser), SkillDataCtrl.create);

router.route('/:id')
/** GET /api/skillDatas/:id - Get skillData */
.get(function (req, res, next) {
  _controllers.SkillDataCtrl.get(req, res, next).then(function (skill) {
    return res.json(skill);
  });
});

/** PUT /api/abouts/:id - Update home */
// .put((req,res,next) => {
//   SkillDataCtrl.update(req,res,next).then(skill => res.json(skill))
// })

/** DELETE /api/abouts/:id - Delete home */
// .delete((req,res,next) => {
//     SkillDataCtrl.remove(req,res,next).then(skill => res.json(skill))
// });

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.SkillDataCtrl.load);

exports.default = router;
//# sourceMappingURL=skill-data-routes.js.map