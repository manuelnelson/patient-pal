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
    _models.ClientCurriculum.find({ client: req.params.clientId }).populate('client appointment curriculum').sort('-createdAt').exec().then(function (clientCurriculums) {
        return res.json(clientCurriculums);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get clientCurriculum
* @returns {ClientCurriculum}
*/
function get(req, res) {
    return res.json(req.clientCurriculum);
}

/**
* Checks if user exists with same email as clientCurriculum.  If not, it creates a new User with the email provided and a default password. Then creates the ClientCurriculum to reside in the new user
* @returns {ClientCurriculum}
*/
function create(req, res, next) {
    var clientCurriculum = new _models.ClientCurriculum(req.body).save().then(function (savedClientCurriculum) {
        return res.json(savedClientCurriculum);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing clientCurriculum
* @returns {ClientCurriculum}
*/
function update(req, res, next) {
    let clientCurriculum = req.clientCurriculum;
    for (var prop in req.clientCurriculum) {
        clientCurriculum[prop] = req.clientCurriculum[prop];
    }
    clientCurriculum.save().then(function (savedClientCurriculum) {
        return res.json(savedClientCurriculum);
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
    _models.ClientCurriculum.list({ limit: limit, skip: skip, query: req.query }).then(function (clientCurriculums) {
        return res.json(clientCurriculums);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete clientCurriculum.
* @returns {ClientCurriculum}
*/
function remove(req, res, next) {
    var clientCurriculum = req.clientCurriculum;
    clientCurriculum.remove().then(function (deletedClientCurriculum) {
        return res.json(deletedClientCurriculum);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, getByClient: getByClient };
//# sourceMappingURL=client-curriculum-controller.js.map