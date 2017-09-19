'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Load skillData and append to req.
*/
function load(req, res, next, id) {
    _models.SkillData.get(id).then(function (skillData) {
        req.skillData = skillData;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get skillData
* @returns {SkillData}
*/
function get(req, res) {
    return req.skillData;
}

/**
* Checks if user exists with same email as skillData.  If not, it creates a new User with the email provided and a default password. Then creates the SkillData to reside in the new user
* @returns {SkillData}
*/
function create(req, res, next) {
    var skillData = new _models.SkillData(req.body).save().then(function (savedSkillData) {
        return savedSkillData;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing skillData
* @returns {SkillData}
*/
function update(req, res, next) {
    var skillData = req.skillData;
    for (var prop in req.skillData) {
        skillData[prop] = req.skillData[prop];
    }
    skillData.save().then(function (savedSkillData) {
        return savedSkillData;
    }).catch(function (e) {
        return next(e);
    });
}
var dateKeys = ['startDate', 'endDate'];
var clientCurriculumKeys = ['client'];

/**
* Get skillData list.
* @property {number} req.query.skip - Number of skillDatas to be skipped.
* @property {number} req.query.limit - Limit number of skillDatas to be returned.
* @returns {SkillData[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    delete req.query.limit;
    delete req.query.skip;
    var query = _models.SkillData;
    query = buildQuery(req, query);
    return query.populate('skill').populate({ path: 'clientCurriculum', populate: { path: 'curriculum client' } }).sort({ trialNumber: -1 }).skip(parseInt(skip)).limit(parseInt(limit)).exec().then(function (skillDatas) {
        return skillDatas;
    }).catch(function (e) {
        return next(e);
    });
}

//this query is specific enough i want to separate it out from rest of traditional REST responses
function listReport(req, res, next) {
    var _req$query2 = req.query,
        _req$query2$limit = _req$query2.limit,
        limit = _req$query2$limit === undefined ? 20 : _req$query2$limit,
        _req$query2$skip = _req$query2.skip,
        skip = _req$query2$skip === undefined ? 0 : _req$query2$skip;

    delete req.query.limit;
    delete req.query.skip;
    //if we are searching by client, we need to do a nested query by client curriculum
    var clientId = req.query.client ? req.query.client : null;
    delete req.query.client;

    var query = _models.SkillData;
    var queryArray = buildQueryObj(req, query);
    return _models.ClientCurriculum.find({ client: clientId }).exec().then(function (clientCurriculums) {
        var ids = clientCurriculums.map(function (curriculum) {
            return curriculum._id;
        });
        queryArray.push({ clientCurriculum: { $in: ids } });
        query = query.find({ $and: queryArray });
        console.log(queryArray);
        return query.populate('skill').populate({ path: 'clientCurriculum', populate: { path: 'curriculum client' } }).sort({ trialNumber: -1 }).skip(parseInt(skip)).limit(parseInt(limit)).exec().then(function (skillDatas) {
            return skillDatas;
        }).catch(function (e) {
            return next(e);
        });
    });
}

//list of fields that are relationships of type many
//builds a query for 
function buildQueryObj(req, query) {
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        if (_lodash2.default.indexOf(dateKeys, key) > -1) {
            if (key == 'startDate') {
                array.push({ createdAt: { $gt: req.query[key] } });
            }
            if (key == 'endDate') array.push({ createdAt: { $lt: req.query[key] } });
        } else {
            var _obj = {};
            _obj[key] = req.query[key];
            array.push(_obj);
        }
    }
    return array;
}

//builds a query for 
function buildQuery(req, query) {
    if (Object.keys(req.query).length === 0) return query.find();
    for (var key in req.query) {
        var _obj2 = {};
        if (_lodash2.default.indexOf(dateKeys, key) > -1) {
            if (key == 'startDate') _obj2[key] = { $gt: req.query[key] };
            if (key == 'endDate') _obj2[key] = { $lt: req.query[key] };
            query = query.find(_obj2);
        } else {
            _obj2[key] = req.query[key];
        }
    }
    return query.find(obj);
}

/**
* Delete skillData.
* @returns {SkillData}
*/
function remove(req, res, next) {
    var skillData = req.skillData;
    skillData.remove().then(function (deletedSkillData) {
        return deletedSkillData;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, listReport: listReport };
//# sourceMappingURL=skill-data-controller.js.map