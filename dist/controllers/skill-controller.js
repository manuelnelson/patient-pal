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
    return res.json(req.skill);
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
        }
    }).then(function (skills) {
        return res.json(skills);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Checks if user exists with same email as skill.  If not, it creates a new User with the email provided and a default password. Then creates the Skill to reside in the new user
* @returns {Skill}
*/
function create(req, res, next) {
    var skill = new _models.Skill(req.body).save().then(function (savedSkill) {
        return res.json(savedSkill);
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
    for (var prop in req.skill) {
        skill[prop] = req.skill[prop];
    }
    skill.save().then(function (savedSkill) {
        return res.json(savedSkill);
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

    _models.Skill.list({ limit: limit, skip: skip }).then(function (skills) {
        return res.json(skills);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete skill.
* @returns {Skill}
*/
function remove(req, res, next) {
    var skill = req.skill;
    skill.remove().then(function (deletedSkill) {
        return res.json(deletedSkill);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, search: search };
//# sourceMappingURL=skill-controller.js.map