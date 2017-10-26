'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _authController = require('./auth-controller');

var _authController2 = _interopRequireDefault(_authController);

var _organizationController = require('./organization-controller');

var _organizationController2 = _interopRequireDefault(_organizationController);

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Load user and append to req.
*/
function load(req, res, next, id) {
    _models.User.get(id).then(function (user) {
        req.user = user;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get user
* @returns {User}
*/
function get(req, res) {
    return res.json(req.user);
}

/**
* Create new user
* @returns {User}
*/
function create(req, res, next) {
    var user = new _models.User({
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
    });

    //check if user already exists
    return _models.User.getByEmail(user.email).then(function (existingUser) {
        if (existingUser) {
            var err = new _APIError2.default('Authentication error: User Already Exists', _httpStatus2.default.UNAUTHORIZED, true);
            return next(err);
        } else {
            user.save().then(function (savedUser) {
                if (savedUser.role == _constants2.default.roles.Professional || savedUser.role == _constants2.default.roles.Admin) {
                    //get organization if it exists, otherwise create
                    return _organizationController2.default.list({ query: { name: req.body.organization } }, res, next).then(function (org) {
                        if (!org || org.length === 0) {
                            return _organizationController2.default.create({ body: { name: req.body.organization, email: req.body.email } }, res, next).then(function (org) {
                                return createProfessional(req, res, next, savedUser, org);
                            });
                        }
                        return createProfessional(req, res, next, savedUser, org[0]);
                    });
                } else {
                    //create the professional asynchronously
                    return new Client({
                        email: req.body.email,
                        status: 1
                    }).save().then(function (savedClient) {
                        savedUser.client = savedClient;
                        savedUser.save();
                        //log user in
                        var authToken = _authController2.default.createToken(savedUser);
                        return res.json(authToken);
                    });
                }
            }).catch(function (e) {
                return next(e);
            });
        }
    }).catch(function (e) {
        return next(e);
    });
}

function createProfessional(req, res, next, savedUser, organization) {
    console.log('5');
    return new _models.Professional({
        email: req.body.email,
        organization: organization._id,
        status: 1
    }).save().then(function (savedProfessional) {
        savedUser.professional = savedProfessional;
        savedUser.save();
        //log user in
        var authToken = _authController2.default.createToken(savedUser);
        return res.json(authToken);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing user
* @property {string} req.body.email - The email of user.
* @returns {User}
*/
function update(req, res, next) {
    var user = req.user;
    user.email = req.body.email;

    return user.save().then(function (savedUser) {
        return res.json(savedUser);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get user list.
* @property {number} req.query.skip - Number of users to be skipped.
* @property {number} req.query.limit - Limit number of users to be returned.
* @returns {User[]}
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
    console.log(queryObj);
    return _models.User.find(queryObj.length > 0 ? { $and: queryObj } : {}).skip(skip).limit(limit).then(function (users) {
        return res.json(users);
    }).catch(function (e) {
        return next(e);
    });
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
* Delete user.
* @returns {User}
*/
function remove(req, res, next) {
    var user = req.user;
    return user.remove().then(function (deletedUser) {
        return res.json(deletedUser);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=user-controller.js.map