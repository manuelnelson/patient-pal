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
* Load skill and append to req.
*/
function load(req, res, next, id) {
    _models.Skill.get(id).then(function (skill) {
        req.skill = skill;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get skill
* @returns {Skill}
*/
function get(req, res) {
    return req.skill;
}

/**
* Get skill
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword, 'ig');
    _models.Skill.find({
        targetName: {
            $regex: regex
        },
        organization: req.query.organization
    }).then(function (skills) {
        return skills;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Checks if user exists with same email as skill.  If not, it creates a new User with the email provided and a default password. Then creates the Skill to reside in the new user
* @returns {Skill}
*/
function create(req, res, next) {
    return new _models.Skill(req.body).save().then(function (savedSkill) {
        return savedSkill;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing skill
* @returns {Skill}
*/
function update(req, res, next) {
    var skill = req.skill;
    for (var prop in req.body) {
        skill[prop] = req.body[prop];
    }
    return skill.save().then(function (savedSkill) {
        return savedSkill;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get skill list.
* @property {number} req.query.skip - Number of skills to be skipped.
* @property {number} req.query.limit - Limit number of skills to be returned.
* @returns {Skill[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;


    var queryObj = buildQuery(req);

    return _models.Skill.find(queryObj.length > 0 ? { $or: queryObj } : {}).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (skills) {
        return skills;
    }).catch(function (e) {
        return next(e);
    });

    // Skill.list({ limit, skip })
    // .then(skills => res.json(skills))
    // .catch(e => next(e));
}

function buildQuery(req) {
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        var obj = {};
        obj[key] = req.query[key];
        array.push(obj);
    }
    return array;
}

/**
* Delete skill.
* @returns {Skill}
*/
function remove(req, res, next) {
    var skill = req.skill;
    return skill.remove().then(function (deletedSkill) {
        return deletedSkill;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, search: search };
//# sourceMappingURL=skill-controller.js.map