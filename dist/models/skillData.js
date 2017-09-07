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

var skillResultSchema = new _mongoose2.default.Schema({
    skill: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Skill'
    },
    clientCurriculum: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'ClientCurriculum'
    },
    trialNumber: {
        type: Number,
        default: 1
    },
    //like all timers, this represents the number of seconds
    timerValue: {
        type: Number
    },
    numberData: {
        type: Number
    },
    stringData: {
        type: String
    },
    notes: {
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
skillResultSchema.statics = {
    /**
    * Get skillResult
    * @param {ObjectId} id - The objectId of skillResult.
    * @returns {Promise<skillResult, APIError>}
    */
    get: function get(id) {
        return this.findById(id).exec().then(function (skillResult) {
            if (skillResult) {
                return skillResult;
            }
            return null;
            // const err = new APIError('No such skillResult exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },


    /**
    * List skillResults in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of skillResults to be skipped.
    * @param {number} limit - Limit number of skillResults to be returned.
    * @returns {Promise<skillResult[]>}
    */
    //    list({ skip = 0, limit = 50 } = {}) {
    list: function list() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$skip = _ref.skip,
            skip = _ref$skip === undefined ? 0 : _ref$skip,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 50 : _ref$limit,
            query = _ref.query;

        return this.find(query).populate('skill').sort({ trialNumber: -1 }).skip(skip).limit(limit).exec();
    }
};

exports.default = _mongoose2.default.model('SkillResult', skillResultSchema);
//# sourceMappingURL=skillData.js.map