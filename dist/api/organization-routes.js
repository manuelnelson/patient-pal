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
/** GET /api/organizations - Get list of organizations */
.get(function (req, res, next) {
  return _controllers.OrganizationCtrl.list(req, res, next).then(function (organizations) {
    return res.json(organizations);
  });
})

/** POST /api/organizations - Create new organization */
.post(function (req, res, next) {
  return _controllers.OrganizationCtrl.create(req, res, next).then(function (organization) {
    return res.json(organization);
  });
});
//.post(AuthCtrl.verifyToken,OrganizationCtrl.create);
// .post(validate(paramValidation.createUser), OrganizationCtrl.create);

router.route('/:id')
/** GET /api/organizations/:id - Get organization */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.OrganizationCtrl.get(req, res, next));
})

/** PUT /api/organizations/:id - Update organization */
.put(function (req, res, next) {
  return _controllers.OrganizationCtrl.update(req, res, next).then(function (organization) {
    return res.json(organization);
  });
})

/** DELETE /api/organizations/:id - Delete organization */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.OrganizationCtrl.remove(req, res, next).then(function (organization) {
    return res.json(organization);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('id', _controllers.OrganizationCtrl.load);

exports.default = router;
//# sourceMappingURL=organization-routes.js.map