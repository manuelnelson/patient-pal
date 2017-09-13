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

var dttTypeSchema = new _mongoose2.default.Schema({
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
dttTypeSchema.statics = {
    /**
    * Get dttType
    * @param {ObjectId} id - The objectId of dttType.
    * @returns {Promise<dttType, APIError>}
    */
    get: function get(id) {
        return this.findById(id).exec().then(function (dttType) {
            if (dttType) {
                return dttType;
            }
            return null;
            // const err = new APIError('No such dttType exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },


    /**
    * List dttTypes in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of dttTypes to be skipped.
    * @param {number} limit - Limit number of dttTypes to be returned.
    * @returns {Promise<dttType[]>}
    */
    list: function list() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$skip = _ref.skip,
            skip = _ref$skip === undefined ? 0 : _ref$skip,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 50 : _ref$limit;

        return this.find().sort('name').skip(skip).limit(limit).exec();
    }
};

exports.default = _mongoose2.default.model('DttType', dttTypeSchema);
//# sourceMappingURL=dttType.js.map