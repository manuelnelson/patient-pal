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

var clientCurriculumSchema = new _mongoose2.default.Schema({
    client: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Patient',
        required: true
    },
    curriculum: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Curriculum',
        required: true
    },
    appointment: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Appointment',
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
clientCurriculumSchema.statics = {
    /**
    * Get clientCurriculum
    * @param {ObjectId} id - The objectId of clientCurriculum.
    * @returns {Promise<clientCurriculum, APIError>}
    */
    get: function get(id) {
        return this.findById(id)
        //Deep populate FTW - TODO look at performance of this
        //https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field
        .populate({ path: 'curriculum', populate: { path: 'skills', populate: { path: 'targetType dttType' } } }).exec().then(function (clientCurriculum) {
            if (clientCurriculum) {
                return clientCurriculum;
            }
            return null;
            // const err = new APIError('No such clientCurriculum exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },


    /**
    * List clientCurriculums in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of clientCurriculums to be skipped.
    * @param {number} limit - Limit number of clientCurriculums to be returned.
    * @param {number} query - Query of remaining properties
    * @returns {Promise<clientCurriculum[]>}
    */
    list: function list() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$skip = _ref.skip,
            skip = _ref$skip === undefined ? 0 : _ref$skip,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 50 : _ref$limit,
            query = _ref.query;

        return this.find(query).populate('curriculum client appointment').sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    }
};

exports.default = _mongoose2.default.model('ClientCurriculum', clientCurriculumSchema);
//# sourceMappingURL=client-curriculum.js.map