'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Load targetType and append to req.
*/
function load(req, res, next, id) {
    _models.TargetType.get(id).then(function (targetType) {
        req.targetType = targetType;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get targetType
* @returns {TargetType}
*/
function get(req, res) {
    return req.targetType;
}

/**
* Checks if user exists with same email as targetType.  If not, it creates a new User with the email provided and a default password. Then creates the TargetType to reside in the new user
* @returns {TargetType}
*/
function create(req, res, next) {
    return new _models.TargetType(req.body).save().then(function (savedTargetType) {
        return savedTargetType;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing targetType
* @returns {TargetType}
*/
function update(req, res, next) {
    var targetType = req.targetType;
    for (var prop in req.body) {
        targetType[prop] = req.body[prop];
    }
    return targetType.save().then(function (savedTargetType) {
        return savedTargetType;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get targetType list.
* @property {number} req.query.skip - Number of targetTypes to be skipped.
* @property {number} req.query.limit - Limit number of targetTypes to be returned.
* @returns {TargetType[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    delete req.query.limit;
    delete req.query.skip;
    var queryObj = buildQuery(req);

    return _models.TargetType.find(queryObj.length > 0 ? { $or: queryObj } : {}).sort('-name').skip(skip).limit(limit).then(function (targetTypes) {
        return targetTypes;
    }).catch(function (e) {
        return next(e);
    });
}

function buildQuery(req) {
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        // if (_.indexOf(dateKeys, key) > -1) {
        //     if (key == 'startDate') {
        //         array.push({ createdAt: { $gt: req.query[key] } });
        //     }
        //     if (key == 'endDate') array.push({ createdAt: { $lt: req.query[key] } });
        // } else {
        var obj = {};
        obj[key] = req.query[key];
        array.push(obj);
        // }
    }
    return array;
}

/**
* Delete targetType.
* @returns {TargetType}
*/
function remove(req, res, next) {
    var targetType = req.targetType;
    return targetType.remove().then(function (deletedTargetType) {
        return deletedTargetType;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=target-type-controller.js.map