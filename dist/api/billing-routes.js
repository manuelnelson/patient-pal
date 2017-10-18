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

router.route('/customers')
// /** GET /api/billing/client - Get list of organizations */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.BillingCtrl.getCustomer(req, res, next).then(function (customer) {
    return res.json(customer);
  });
})

/** POST /api/billing/customers - Create new organization */
.post(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.BillingCtrl.createCustomer(req, res, next).then(function (customer) {
    return res.json(customer);
  });
});

router.route('/sources')

/** POST /api/billing/customers - Create new organization */
.post(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.BillingCtrl.createSource(req, res, next).then(function (customer) {
    return res.json(customer);
  });
});

router.route('/subscriptions')
/** POST /api/billing/subscriptions - Create new subscription */
.post(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.BillingCtrl.createSubscription(req, res, next).then(function (subscription) {
    return res.json(subscription);
  });
});
router.route('/subscriptions/:id')
/** GET /api/subscriptions/:id - Get subscription */
.get(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.BillingCtrl.getSubscription(req, res, next).then(function (customer) {
    return res.json(customer);
  });
})

/** PUT /api/subscriptions/:id - Update subscription */
.put(_controllers.AuthCtrl.verifyToken, function (req, res, next) {
  return _controllers.BillingCtrl.updateSubscription(req, res, next).then(function (organization) {
    return res.json(organization);
  });
});

//   /** DELETE /api/organizations/:id - Delete organization */
//   .delete(AuthCtrl.verifyToken, (req,res,next) => OrganizationCtrl.remove(req,res,next).then(organization => res.json(organization)));

/** Load user when API with userId route parameter is hit */
// router.param('id', OrganizationCtrl.load);

exports.default = router;
//# sourceMappingURL=billing-routes.js.map