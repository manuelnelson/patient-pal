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
* Load clientCurriculum and append to req.
*/
function load(req, res, next, id) {
    _models.ClientCurriculum.get(id).then(function (clientCurriculum) {
        req.clientCurriculum = clientCurriculum;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Load clientCurriculum and append to req.
*/
function getByClient(req, res, next) {
    return _models.ClientCurriculum.find({ client: req.params.clientId }).populate('client appointment curriculum').sort('-createdAt').exec().then(function (clientCurriculums) {
        return clientCurriculums;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get clientCurriculum
* @returns {ClientCurriculum}
*/
function get(req, res) {
    return req.clientCurriculum;
}

/**
* Checks if user exists with same email as clientCurriculum.  If not, it creates a new User with the email provided and a default password. Then creates the ClientCurriculum to reside in the new user
* @returns {ClientCurriculum}
*/
function create(req, res, next) {
    return new _models.ClientCurriculum(req.body).save().then(function (savedClientCurriculum) {
        return savedClientCurriculum;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing clientCurriculum
* @returns {ClientCurriculum}
*/
function update(req, res, next) {
    var clientCurriculum = req.clientCurriculum;
    for (var prop in req.body) {
        clientCurriculum[prop] = req.body[prop];
    }
    return clientCurriculum.save().then(function (savedClientCurriculum) {
        return savedClientCurriculum;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get clientCurriculum list.
* @property {number} req.query.skip - Number of clientCurriculums to be skipped.
* @property {number} req.query.limit - Limit number of clientCurriculums to be returned.
* @returns {ClientCurriculum[]}
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

    return _models.ClientCurriculum.find(queryObj.length > 0 ? { $and: queryObj } : {}).sort({ createdAt: -1 }).populate('curriculum client appointment').skip(skip).limit(limit).then(function (clientCurriculums) {
        return clientCurriculums;
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
* Delete clientCurriculum.
* @returns {ClientCurriculum}
*/
function remove(req, res, next) {
    var clientCurriculum = req.clientCurriculum;
    return clientCurriculum.remove().then(function (deletedClientCurriculum) {
        return deletedClientCurriculum;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, getByClient: getByClient };
//# sourceMappingURL=client-curriculum-controller.js.map