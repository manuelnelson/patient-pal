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
/** GET /api/curriculums - Get list of curriculums */
.get(_controllers.CurriculumCtrl.list)

/** POST /api/curriculums - Create new curriculum */
.post(_controllers.AuthCtrl.verifyToken, _controllers.CurriculumCtrl.create);
// .post(validate(paramValidation.createUser), CurriculumCtrl.create);

router.route('/:id')
/** GET /api/curriculums/:id - Get curriculum */
.get(_controllers.CurriculumCtrl.get)

/** PUT /api/curriculums/:id - Update curriculum */
.put(_controllers.CurriculumCtrl.update)

/** DELETE /api/curriculums/:id - Delete curriculum */
.delete(_controllers.CurriculumCtrl.remove);

router.route('/search/:keyword')
/** GET /api/skills/search/:keyword - search skills */
.get(_controllers.CurriculumCtrl.search);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.CurriculumCtrl.load);

exports.default = router;
//# sourceMappingURL=curriculum-routes.js.map