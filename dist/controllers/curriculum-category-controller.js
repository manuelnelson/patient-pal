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
* Load curriculumCategory and append to req.
*/
function load(req, res, next, id) {
    _models.CurriculumCategory.get(id).then(function (curriculumCategory) {
        req.curriculumCategory = curriculumCategory;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get curriculumCategory
* @returns {CurriculumCategory}
*/
function get(req, res) {
    return req.curriculumCategory;
}

/**
* check if exists first, if exists, return, otherwise create
* @returns {CurriculumCategory}
*/
function create(req, res, next) {
    return _models.CurriculumCategory.find(req.body).exec().then(function (result) {
        if (result && result.length > 0) {
            return result[0];
        }
        return new _models.CurriculumCategory(req.body).save().then(function (savedCurriculumCategory) {
            return savedCurriculumCategory;
        }).catch(function (e) {
            return next(e);
        });
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing curriculumCategory
* @returns {CurriculumCategory}
*/
function update(req, res, next) {
    var curriculumCategory = req.curriculumCategory;
    for (var prop in req.body) {
        curriculumCategory[prop] = req.body[prop];
    }
    return curriculumCategory.save().then(function (savedCurriculumCategory) {
        return savedCurriculumCategory;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get curriculumCategory list.
* @property {number} req.query.skip - Number of curriculumCategorys to be skipped.
* @property {number} req.query.limit - Limit number of curriculumCategorys to be returned.
* @returns {CurriculumCategory[]}
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

    return _models.CurriculumCategory.find(queryObj.length > 0 ? { $or: queryObj } : {}).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (curriculumCategorys) {
        return curriculumCategorys;
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
* Get skill
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword, 'ig');
    return _models.CurriculumCategory.find({
        name: {
            $regex: regex
        },
        organization: req.query.organization
    }).exec().then(function (curriculumCategories) {
        return curriculumCategories;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete curriculumCategory.
* @returns {CurriculumCategory}
*/
function remove(req, res, next) {
    var curriculumCategory = req.curriculumCategory;
    return curriculumCategory.remove().then(function (deletedCurriculumCategory) {
        return deletedCurriculumCategory;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, search: search };
//# sourceMappingURL=curriculum-category-controller.js.map