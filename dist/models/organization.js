'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var organizationSchema = new _mongoose2.default.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    stripeCustomerId: {
        type: String
    },
    stripeSourceId: {
        type: String
    },
    stripeSubscriptionId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
organizationSchema.statics = {
    /**
    * Get organization
    * @param {ObjectId} id - The objectId of organization.
    * @returns {Promise<organization, APIError>}
    */
    get: function get(id) {
        return this.findById(id).exec().then(function (organization) {
            if (organization) {
                return organization;
            } else {
                var err = new _APIError2.default('No such organization exists!', _httpStatus2.default.NOT_FOUND);
                return _bluebird2.default.reject(err);
            }
        });
    },


    /**
    * List organizations in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of organizations to be skipped.
    * @param {number} limit - Limit number of organizations to be returned.
    * @returns {Promise<organization[]>}
    */
    list: function list() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$skip = _ref.skip,
            skip = _ref$skip === undefined ? 0 : _ref$skip,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 50 : _ref$limit;

        return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    }
};

/* before we create an organization, we need to make sure we have an account and subscription for it through stripe. */
organizationSchema.pre('save', function (next) {
    var _this = this;

    // we do not want to lose the correct context of the keyword `this`, so let's cache it in a variable called organization
    var organization = this;
    /* if stripe customer doesn't exists, let's create it*/
    if (!organization.stripeCustomerId) {
        _controllers.BillingCtrl.createCustomer({ locals: { sessionUserEmail: organization.email } }, {}, next).then(function (customer) {
            _this.stripeCustomerId = customer.id;
            var req = { body: {
                    customer: customer.id
                } };
            //create subscription
            _controllers.BillingCtrl.createSubscription(req, {}, next).then(function (subscription) {
                _this.stripeSubscriptionId = subscription.id;
                next();
            });
        });
    } else {
        next();
    }
});

exports.default = _mongoose2.default.model('Organization', organizationSchema);
//# sourceMappingURL=organization.js.map