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

var SkillSchema = new _mongoose2.default.Schema({
    targetName: {
        type: String,
        required: true,
        text: true
    },
    goalName: {
        type: String
    },
    stimulus: {
        type: String
    },
    numberOfTrials: {
        type: Number,
        required: true,
        default: 1
    },
    targetType: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'TargetType'
    },
    //specific to ddt target type and jump-to
    dttType: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'DttType'
    },
    //specific to target types duration (seconds), fluency/rate (amount), whole/partial interval
    //will always store amount in seconds
    interval: {
        type: Number,
        default: 0
    },
    taskSteps: {
        type: String
    },
    //specific to quantity target type
    maxThreshold: {
        type: Number,
        default: 0
    },
    //two mastery types, 1 = Automatic, 2 = Manual
    masteryType: {
        type: Number
    },
    targetInstructions: {
        type: String
    },
    organization: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Organization'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
SkillSchema.index({ 'targetName': 'text' });
/**
* Statics
*/
SkillSchema.statics = {
    /**
    * Get Skill
    * @param {ObjectId} id - The objectId of Skill.
    * @returns {Promise<Skill, APIError>}
    */
    get: function get(id) {
        return this.findById(id).populate('targetType dttType').exec().then(function (Skill) {
            if (Skill) {
                return Skill;
            } else {
                var err = new _APIError2.default('No such Skill exists!', _httpStatus2.default.NOT_FOUND);
                return _bluebird2.default.reject(err);
            }
        });
    },


    /**
    * List Skills in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Skills to be skipped.
    * @param {number} limit - Limit number of Skills to be returned.
    * @returns {Promise<Skill[]>}
    */
    list: function list() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$skip = _ref.skip,
            skip = _ref$skip === undefined ? 0 : _ref$skip,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 50 : _ref$limit;

        return this.find().sort({ createdAt: -1 }).populate('targetType dttType').skip(skip).limit(limit).exec();
    }
};

exports.default = _mongoose2.default.model('Skill', SkillSchema);
//# sourceMappingURL=skill.js.map