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
* Load organization and append to req.
*/
function load(req, res, next, id) {
    _models.Organization.get(id).then(function (organization) {
        req.organization = organization;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get organization
* @returns {Organization}
*/
function get(req, res) {
    return req.organization;
}

/**
* Checks if user exists with same email as organization.  If not, it creates a new User with the email provided and a default password. Then creates the Organization to reside in the new user
* @returns {Organization}
*/
function create(req, res, next) {
    return new _models.Organization(req.body).save().then(function (savedOrganization) {
        return savedOrganization;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing organization
* @returns {Organization}
*/
function update(req, res, next) {
    var organization = req.organization;
    for (var prop in req.organization) {
        organization[prop] = req.organization[prop];
    }
    organization.save().then(function (savedOrganization) {
        return savedOrganization;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get organization list.
* @property {number} req.query.skip - Number of organizations to be skipped.
* @property {number} req.query.limit - Limit number of organizations to be returned.
* @returns {Organization[]}
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

    return _models.Organization.find(queryObj.length > 0 ? { $or: queryObj } : {}).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (organizations) {
        return organizations;
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
* Delete organization.
* @returns {Organization}
*/
function remove(req, res, next) {
    var organization = req.organization;
    organization.remove().then(function (deletedOrganization) {
        return deletedOrganization;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=organization-controller.js.map