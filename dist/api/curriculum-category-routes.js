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
/** GET /api/curriculumcategories - Get list of curriculumcategories */
.get(function (req, res, next) {
  return _controllers.CurriculumCategoryCtrl.list(req, res, next).then(function (curriculumcategories) {
    return res.json(curriculumcategories);
  });
})

/** POST /api/curriculumcategories - Create new curriculumCategory */
.post(function (req, res, next) {
  return _controllers.CurriculumCategoryCtrl.create(req, res, next).then(function (curriculumCategory) {
    return res.json(curriculumCategory);
  });
});
//.post(AuthCtrl.verifyToken,CurriculumCategoryCtrl.create);
// .post(validate(paramValidation.createUser), CurriculumCategoryCtrl.create);

router.route('/:id')
/** GET /api/curriculumcategories/:id - Get curriculumCategory */
.get(function (req, res, next) {
  return res.json(_controllers.CurriculumCategoryCtrl.get(req, res, next));
})

/** PUT /api/curriculumcategories/:id - Update curriculumCategory */
.put(function (req, res, next) {
  return _controllers.CurriculumCategoryCtrl.update(req, res, next).then(function (curriculumCategory) {
    return res.json(curriculumCategory);
  });
})

/** DELETE /api/curriculumcategories/:id - Delete curriculumCategory */
.delete(function (req, res, next) {
  return _controllers.CurriculumCategoryCtrl.remove(req, res, next).then(function (curriculumCategory) {
    return res.json(curriculumCategory);
  });
});

router.route('/search/:keyword')
/** GET /api/skills/search/:keyword - search skills */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.CurriculumCategoryCtrl.search(req, res, next).then(function (skills) {
    return res.json(skills);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.CurriculumCategoryCtrl.load);

exports.default = router;
//# sourceMappingURL=curriculum-category-routes.js.map