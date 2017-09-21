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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var organizationSchema = new _mongoose2.default.Schema({
    name: {
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
            }
            return null;
            // const err = new APIError('No such organization exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
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

exports.default = _mongoose2.default.model('Organization', organizationSchema);
//# sourceMappingURL=organization.js.map