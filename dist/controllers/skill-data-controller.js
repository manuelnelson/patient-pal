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
    return res.json(req.skillData);
}

/**
* Checks if user exists with same email as skillData.  If not, it creates a new User with the email provided and a default password. Then creates the SkillData to reside in the new user
* @returns {SkillData}
*/
function create(req, res, next) {
    var skillData = new _models.SkillData(req.body).save().then(function (savedSkillData) {
        return res.json(savedSkillData);
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
        return res.json(savedSkillData);
    }).catch(function (e) {
        return next(e);
    });
}

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
    _models.SkillData.list({ limit: limit, skip: skip, query: req.query }).then(function (skillDatas) {
        return res.json(skillDatas);
    }).catch(function (e) {
        return next(e);
    });

    //SkillData.list({ limit, skip })
}

/**
* Delete skillData.
* @returns {SkillData}
*/
function remove(req, res, next) {
    var skillData = req.skillData;
    skillData.remove().then(function (deletedSkillData) {
        return res.json(deletedSkillData);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=skill-data-controller.js.map