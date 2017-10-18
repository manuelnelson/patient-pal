'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

var _controllers = require('../controllers');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stripe = require('stripe')('sk_test_6NSkvQScMlPpq0NdmHS4WiQf');

/**
* Get stripe customer based on organization id
* @returns {Customer}
*/
function getCustomer(req, res, next) {
    //get organization
    return _controllers.OrganizationCtrl.getById(req, res, next, req.query.organizationId).then(function (org) {
        return stripe.customers.retrieve(org.stripeCustomerId).then(function (customer) {
            return customer;
        });
    }).catch(function (e) {
        return next(e);
    });

    //query customer
}

/**
* Creates a Stripe customer
* @returns {Customer}
*/
function createCustomer(req, res, next) {

    return stripe.customers.create({
        description: 'Customer for ' + req.locals.sessionUserEmail,
        email: req.locals.sessionUserEmail
    }).then(function (customer) {
        return customer;
    }).catch(function (e) {
        return next(e);
    });
}

// Stripes Source is a payment source that is connected to a customer.
//https://stripe.com/docs/api/node#create_card
function createSource(req, res, next) {

    return stripe.customers.createSource(req.body.customer, {
        source: req.body.token
    }).then(function (source) {
        //update organization
        return _controllers.OrganizationCtrl.getById(req, res, next, req.body.organizationId).then(function (org) {
            return _controllers.OrganizationCtrl.update({ body: { stripeSourceId: source.id }, organization: org }, res, next).then(function (updatedOrg) {
                return source;
            }).catch(function (e) {
                return next(e);
            });
        }).catch(function (e) {
            return next(e);
        });
    }).catch(function (e) {
        return next(e);
    });
}

//  function createSubscription(req, res, next) {    
//      return stripe.customers.createSource(req.body.customer,{
//          source: req.body.token,
//      })
//      .then((source) => {
//          //update organization
//          return OrganizationCtrl.getById(req,res,next, req.body.organizationId)
//              .then(org => {                
//                  return OrganizationCtrl.update({body:{stripeSourceId: source.id}, organization: org}, res, next)
//                      .then(updatedOrg => source)
//                      .catch(e => next(e));
//              })
//              .catch(e => next(e));
//      })
//      .catch(e => next(e));     
//  }

function getSubscription(req, res, next) {
    return stripe.subscriptions.retrieve(req.params.id).then(function (subscription) {
        return subscription;
    }).catch(function (e) {
        return next(e);
    });
}

function updateSubscription(req, res, next) {
    return stripe.subscriptions.update(req.query.subscriptionId, req.body).then(function (subscription) {
        return subscription;
    }).catch(function (e) {
        return next(e);
    });
}

function createSubscription(req, res, next) {
    return stripe.subscriptions.create({
        customer: req.body.customer,
        billing: 'send_invoice',
        "days_until_due": 31,
        items: [{
            plan: "pl_default"
        }]
    }).then(function (subscription) {
        return subscription;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { createCustomer: createCustomer, getCustomer: getCustomer, createSource: createSource, createSubscription: createSubscription, getSubscription: getSubscription, updateSubscription: updateSubscription };
//# sourceMappingURL=billing-controller.js.map