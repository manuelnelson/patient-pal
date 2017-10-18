'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _curriculumValidation = require('../config/curriculum-validation');

var _curriculumValidation2 = _interopRequireDefault(_curriculumValidation);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/curriculums - Get list of curriculums */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.CurriculumCtrl.list(req, res, next).then(function (curriculums) {
    return res.json(curriculums);
  });
})

/** POST /api/curriculums - Create new curriculum */
.post(_controllers.AuthCtrl.verifyToken, (0, _expressValidation2.default)(_curriculumValidation2.default.createCurriculum), function (req, res, next) {
  return _controllers.CurriculumCtrl.create(req, res, next).then(function (curriculum) {
    return res.json(curriculum);
  });
});
//.post(AuthCtrl.verifyToken,CurriculumCtrl.create);
// .post(validate(paramValidation.createUser), CurriculumCtrl.create);

router.route('/:id')
/** GET /api/curriculums/:id - Get curriculum */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.CurriculumCtrl.get(req, res, next));
})

/** PUT /api/curriculums/:id - Update curriculum */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.CurriculumCtrl.update(req, res, next).then(function (curriculum) {
    return res.json(curriculum);
  });
})

/** DELETE /api/curriculums/:id - Delete curriculum */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.CurriculumCtrl.remove(req, res, next).then(function (curriculum) {
    return res.json(curriculum);
  });
});

router.route('/search/:keyword')
/** GET /api/skills/search/:keyword - search skills */
.get(_controllers.CurriculumCtrl.search);
/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.CurriculumCtrl.load);

exports.default = router;
//# sourceMappingURL=curriculum-routes.js.map