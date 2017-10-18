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
* Load dttType and append to req.
*/
function load(req, res, next, id) {
    _models.DttType.get(id).then(function (dttType) {
        req.dttType = dttType;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get dttType
* @returns {DttType}
*/
function get(req, res) {
    return req.dttType;
}

/**
* Checks if user exists with same email as dttType.  If not, it creates a new User with the email provided and a default password. Then creates the DttType to reside in the new user
* @returns {DttType}
*/
function create(req, res, next) {
    return new _models.DttType(req.body).save().then(function (savedDttType) {
        return savedDttType;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing dttType
* @returns {DttType}
*/
function update(req, res, next) {
    var dttType = req.dttType;
    for (var prop in req.body) {
        dttType[prop] = req.body[prop];
    }
    return dttType.save().then(function (savedDttType) {
        return savedDttType;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get dttType list.
* @property {number} req.query.skip - Number of dttTypes to be skipped.
* @property {number} req.query.limit - Limit number of dttTypes to be returned.
* @returns {DttType[]}
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

    return _models.DttType.find(queryObj.length > 0 ? { $or: queryObj } : {}).sort('-name').skip(skip).limit(limit).then(function (dttTypes) {
        return dttTypes;
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
* Delete dttType.
* @returns {DttType}
*/
function remove(req, res, next) {
    var dttType = req.dttType;
    return dttType.remove().then(function (deletedDttType) {
        return deletedDttType;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=dtt-type-controller.js.map