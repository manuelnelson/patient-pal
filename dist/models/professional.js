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

var ProfessionalSchema = new _mongoose2.default.Schema({
    email: {
        type: String,
        required: true,
        validate: [_validator2.default.isEmail, 'invalid email'],
        unique: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    patients: [{ type: _mongoose2.default.Schema.ObjectId, ref: 'Patient' }],
    //1 = active, 0 = disabled or disactive
    status: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
ProfessionalSchema.statics = {
    /**
    * Get Professional
    * @param {ObjectId} email - The email of Professional.
    * @returns {Promise<Professional, APIError>}
    */
    get: function get(id) {
        return this.findById(id).populate('patients').exec().then(function (Professional) {
            if (Professional) {
                return Professional;
            }
            var err = new _APIError2.default('No such Professional exists!', _httpStatus2.default.NOT_FOUND);
            return _bluebird2.default.reject(err);
        });
    },

    /**
    * Get Professional by Email
    * @param {string} email - The email of Professional.
    * @returns {Promise<Professional, APIError>}
    */
    getByEmail: function getByEmail(email) {
        return this.findOne({ email: email }).populate('patients').exec().then(function (Professional) {
            if (Professional) {
                return Professional;
            }
            var err = new _APIError2.default('No such Professional exists!', _httpStatus2.default.NOT_FOUND);
            return _bluebird2.default.reject(err);
        });
    },


    /**
    * List Professionals in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Professionals to be skipped.
    * @param {number} limit - Limit number of Professionals to be returned.
    * @returns {Promise<Professional[]>}
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

exports.default = _mongoose2.default.model('Professional', ProfessionalSchema);
//# sourceMappingURL=professional.js.map