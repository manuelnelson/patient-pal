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

var PatientSchema = new _mongoose2.default.Schema({
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
    birth: {
        type: Date
    },
    sex: {
        type: String
    },
    insurance: {
        type: String
    },
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
PatientSchema.statics = {
    /**
    * Get Patient
    * @param {ObjectId} id - The objectId of Patient.
    * @returns {Promise<Patient, APIError>}
    */
    get: function get(id) {
        return this.findById(id).exec().then(function (Patient) {
            if (Patient) {
                return Patient;
            }
            return null;
            // const err = new APIError('No such Patient exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * Get Patient by Email
    * @param {string} email - The email of Patient.
    * @returns {Promise<Patient, APIError>}
    */
    getByEmail: function getByEmail(email) {
        return this.findOne({ email: email }).exec().then(function (Patient) {
            if (Patient) {
                return Patient;
            }
            return null;
            // const err = new APIError('No such Patient exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },


    /**
    * List Patients in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Patients to be skipped.
    * @param {number} limit - Limit number of Patients to be returned.
    * @returns {Promise<Patient[]>}
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

exports.default = _mongoose2.default.model('Patient', PatientSchema);
//# sourceMappingURL=patient.js.map