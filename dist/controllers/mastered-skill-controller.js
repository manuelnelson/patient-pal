'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _controllers = require('../controllers');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Load masteredSkill and append to req.
*/
function load(req, res, next, id) {
    _models.MasteredSkill.get(id).then(function (masteredSkill) {
        req.masteredSkill = masteredSkill;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get masteredSkill
* @returns {masteredSkill}
*/
function get(req, res) {
    return req.masteredSkill;
}

var dateKeys = ['startDate', 'endDate'];
var clientCurriculumKeys = ['client'];

/**
* Checks if user exists with same email as masteredSkill.  If not, it creates a new User with the email provided and a default password. Then creates the masteredSkill to reside in the new user
* @returns {masteredSkill}
*/
function create(req, res, next) {
    //properties from the request still need to be filled out.
    var query = { query: { client: req.body.client, curriculum: req.body.curriculum } };
    return _controllers.ClientCurriculumCtrl.list(query, res, next).then(function (clientCurriculums) {
        if (clientCurriculums && clientCurriculums.length > 0) {
            var masteredSkill = {
                curriculum: req.body.curriculum,
                client: req.body.client,
                skill: req.body.skill,
                //start date is the date of the first clientCurriculum
                started: clientCurriculums[0].createdAt,
                numberOfTrials: clientCurriculums.length * parseInt(req.body.numberOfTrials)
            };
            return new _models.MasteredSkill(masteredSkill).save().then(function (savedmasteredSkill) {
                return savedmasteredSkill;
            }).catch(function (e) {
                return next(e);
            });
        } else {
            return next(new _APIError2.default('There\'s been an issue trying to master this skill', _httpStatus2.default.BAD_REQUEST, true));
        }
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing masteredSkill
* @returns {masteredSkill}
*/
function update(req, res, next) {
    var masteredSkill = req.masteredSkill;
    for (var prop in req.body) {
        masteredSkill[prop] = req.body[prop];
    }
    return masteredSkill.save().then(function (savedmasteredSkill) {
        return savedmasteredSkill;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get masteredSkill list.
* @property {number} req.query.skip - Number of masteredSkills to be skipped.
* @property {number} req.query.limit - Limit number of masteredSkills to be returned.
* @returns {masteredSkill[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    delete req.query.limit;
    delete req.query.skip;

    var queryArray = buildQueryObj(req);

    //    let queryObj = buildQuery(req);

    return _models.MasteredSkill.find(queryArray.length > 0 ? { $or: queryArray } : {}).sort({ createdAt: -1 }).populate({ path: 'skill', populate: { path: 'targetType dttType' } }).populate('client curriculum').skip(skip).limit(limit).then(function (masteredSkills) {
        return masteredSkills;
    }).catch(function (e) {
        return next(e);
    });
}
function buildQueryObj(req) {
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        if (_.indexOf(dateKeys, key) > -1) {
            if (key == 'startDate') {
                array.push({ createdAt: { $gt: req.query[key] } });
            }
            if (key == 'endDate') array.push({ createdAt: { $lt: req.query[key] } });
        } else {
            var obj = {};
            obj[key] = req.query[key];
            array.push(obj);
        }
    }
    return array;
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
* Delete masteredSkill.
* @returns {masteredSkill}
*/
function remove(req, res, next) {
    var masteredSkill = req.masteredSkill;
    return masteredSkill.remove().then(function (deletedmasteredSkill) {
        return deletedmasteredSkill;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=mastered-skill-controller.js.map