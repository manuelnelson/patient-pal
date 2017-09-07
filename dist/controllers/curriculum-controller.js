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
* Load curriculum and append to req.
*/
function load(req, res, next, id) {
    _models.Curriculum.get(id).then(function (curriculum) {
        req.curriculum = curriculum;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get curriculum
* @returns {Curriculum}
*/
function get(req, res) {
    return res.json(req.curriculum);
}

/**
* Checks if user exists with same email as curriculum.  If not, it creates a new User with the email provided and a default password. Then creates the Curriculum to reside in the new user
* @returns {Curriculum}
*/
function create(req, res, next) {
    var curriculum = new _models.Curriculum(req.body).save().then(function (savedCurriculum) {
        return res.json(savedCurriculum);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing curriculum
* @returns {Curriculum}
*/
function update(req, res, next) {
    var curriculum = req.curriculum;
    for (var prop in req.curriculum) {
        curriculum[prop] = req.curriculum[prop];
    }
    curriculum.save().then(function (savedCurriculum) {
        return res.json(savedCurriculum);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get curriculum list.
* @property {number} req.query.skip - Number of curriculums to be skipped.
* @property {number} req.query.limit - Limit number of curriculums to be returned.
* @returns {Curriculum[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    _models.Curriculum.list({ limit: limit, skip: skip }).then(function (curriculums) {
        return res.json(curriculums);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete curriculum.
* @returns {Curriculum}
*/
function remove(req, res, next) {
    var curriculum = req.curriculum;
    curriculum.remove().then(function (deletedCurriculum) {
        return res.json(deletedCurriculum);
    }).catch(function (e) {
        return next(e);
    });
}
/**
* Get skill
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword, 'ig');
    _models.Curriculum.find({
        name: {
            $regex: regex
        }
    }).then(function (curriculums) {
        return res.json(curriculums);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, search: search };
//# sourceMappingURL=curriculum-controller.js.map