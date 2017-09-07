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
    return res.json(req.dttType);
}

/**
* Checks if user exists with same email as dttType.  If not, it creates a new User with the email provided and a default password. Then creates the DttType to reside in the new user
* @returns {DttType}
*/
function create(req, res, next) {
    var dttType = new _models.DttType(req.body).save().then(function (savedDttType) {
        return res.json(savedDttType);
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
    for (var prop in req.dttType) {
        dttType[prop] = req.dttType[prop];
    }
    dttType.save().then(function (savedDttType) {
        return res.json(savedDttType);
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

    _models.DttType.list({ limit: limit, skip: skip }).then(function (dttTypes) {
        return res.json(dttTypes);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete dttType.
* @returns {DttType}
*/
function remove(req, res, next) {
    var dttType = req.dttType;
    dttType.remove().then(function (deletedDttType) {
        return res.json(deletedDttType);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=dtt-type-controller.js.map