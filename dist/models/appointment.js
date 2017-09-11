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

var AppointmentSchema = new _mongoose2.default.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    client: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Client'
    },
    professional: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Professional'
    },
    location: {
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
AppointmentSchema.statics = {
    /**
    * Get Appointment
    * @param {ObjectId} id - The objectId of Appointment.
    * @returns {Promise<Appointment, APIError>}
    */
    get: function get(id) {
        return this.findById(id).populate('professional client').exec().then(function (Appointment) {
            if (Appointment) {
                return Appointment;
            }
            return null;
            // const err = new APIError('No such Appointment exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },


    /**
    * List Appointments in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Appointments to be skipped.
    * @param {number} limit - Limit number of Appointments to be returned.
    * @returns {Promise<Appointment[]>}
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

exports.default = _mongoose2.default.model('Appointment', AppointmentSchema);
//# sourceMappingURL=appointment.js.map