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

var curriculumCategorySchema = new _mongoose2.default.Schema({
    name: {
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

/**
* Statics
*/
curriculumCategorySchema.statics = {
    /**
    * Get curriculumCategory
    * @param {ObjectId} id - The objectId of curriculumCategory.
    * @returns {Promise<curriculumCategory, APIError>}
    */
    get: function get(id) {
        return this.findById(id).exec().then(function (curriculumCategory) {
            if (curriculumCategory) {
                return curriculumCategory;
            } else {
                var err = new _APIError2.default('No such curriculumCategory exists!', _httpStatus2.default.NOT_FOUND);
                return _bluebird2.default.reject(err);
            }
        });
    },


    /**
    * List curriculumCategorys in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of curriculumCategorys to be skipped.
    * @param {number} limit - Limit number of curriculumCategorys to be returned.
    * @returns {Promise<curriculumCategory[]>}
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

exports.default = _mongoose2.default.model('CurriculumCategory', curriculumCategorySchema);
//# sourceMappingURL=curriculumCategory.js.map