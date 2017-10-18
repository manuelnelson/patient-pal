'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _clientValidation = require('../config/client-validation');

var _clientValidation2 = _interopRequireDefault(_clientValidation);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/clients - Get list of clients */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCtrl.list(req, res, next).then(function (clients) {
    return res.json(clients);
  });
})

/** POST /api/clients - Create new client */
.post(_controllers.AuthCtrl.verifyToken, (0, _expressValidation2.default)(_clientValidation2.default.createClient), function (req, res, next) {
  return _controllers.ClientCtrl.create(req, res, next).then(function (client) {
    return res.json(client);
  });
});
//.post(AuthCtrl.verifyToken,ClientCtrl.create);
// .post(validate(paramValidation.createUser), ClientCtrl.create);

router.route('/:userId')
/** GET /api/clients/:id - Get client */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return res.json(_controllers.ClientCtrl.get(req, res, next));
})

/** PUT /api/clients/:id - Update client */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCtrl.update(req, res, next).then(function (client) {
    return res.json(client);
  });
})

/** DELETE /api/clients/:id - Delete client */
.delete(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCtrl.remove(req, res, next).then(function (client) {
    return res.json(client);
  });
});

router.route('/:userId/appointments').get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.ClientCtrl.getAppointments(req, res, next).then(function (appointments) {
    return res.json(appointments);
  });
});

/** Load user when API with userId route parameter is hit */
router.param('userId', _controllers.ClientCtrl.load);

exports.default = router;
//# sourceMappingURL=client-routes.js.map