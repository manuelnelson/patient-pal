'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _clientCurriculumValidation = require('../config/client-curriculum-validation');

var _clientCurriculumValidation2 = _interopRequireDefault(_clientCurriculumValidation);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/clientCurriculums - Get list of clientCurriculums */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCurriculumCtrl.list(req, res, next).then(function (clientCurriculums) {
    return res.json(clientCurriculums);
  });
})

/** POST /api/clientCurriculums - Create new clientCurriculum */
.post(_controllers.AuthCtrl.verifyToken, (0, _expressValidation2.default)(_clientCurriculumValidation2.default.createClientCurriculum), function (req, res, next) {
  return _controllers.ClientCurriculumCtrl.create(req, res, next).then(function (clientCurriculum) {
    return res.json(clientCurriculum);
  });
});
//.post(AuthCtrl.verifyToken,ClientCurriculumCtrl.create);
// .post(validate(paramValidation.createUser), ClientCurriculumCtrl.create);

router.route('/:id')
/** GET /api/clientCurriculums/:id - Get clientCurriculum */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.ClientCurriculumCtrl.get(req, res, next));
})

/** PUT /api/clientCurriculums/:id - Update clientCurriculum */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCurriculumCtrl.update(req, res, next).then(function (clientCurriculum) {
    return res.json(clientCurriculum);
  });
})

/** DELETE /api/clientCurriculums/:id - Delete clientCurriculum */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCurriculumCtrl.remove(req, res, next).then(function (clientCurriculum) {
    return res.json(clientCurriculum);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.ClientCurriculumCtrl.load);

exports.default = router;
//# sourceMappingURL=client-curriculum-routes.js.map