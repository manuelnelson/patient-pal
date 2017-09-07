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
/** GET /api/clientCurriculums - Get list of clientCurriculums */
.get(_controllers.ClientCurriculumCtrl.list)

/** POST /api/clientCurriculums - Create new clientCurriculum */
.post(_controllers.AuthCtrl.verifyToken, _controllers.ClientCurriculumCtrl.create);
// .post(validate(paramValidation.createUser), ClientCurriculumCtrl.create);

router.route('/:id')
/** GET /api/clientCurriculums/:id - Get clientCurriculum */
.get(_controllers.ClientCurriculumCtrl.get)

/** PUT /api/clientCurriculums/:id - Update clientCurriculum */
.put(_controllers.ClientCurriculumCtrl.update)

/** DELETE /api/clientCurriculums/:id - Delete clientCurriculum */
.delete(_controllers.ClientCurriculumCtrl.remove);

router.route('/client/:clientId')
/** GET /api/clientCurriculums/:id - Get clientCurriculum */
.get(_controllers.ClientCurriculumCtrl.getByClient);

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.ClientCurriculumCtrl.load);

exports.default = router;
//# sourceMappingURL=client-curriculum-routes.js.map