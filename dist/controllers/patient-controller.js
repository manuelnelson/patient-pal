'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _constants = require('../lib/constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Load client and append to req.
*/
function load(req, res, next, userId) {
    _models.Client.get(userId).then(function (client) {
        req.client = client;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get client
* @returns {Client}
*/
function get(req, res) {
    return res.json(req.client);
}

/**
* Checks if user exists with same email as client.  If not, it creates a new User with the email provided and a default password. Then creates the Client to reside in the new user
* @returns {Client}
*/
function create(req, res, next) {
    _models.Client.getByEmail(req.body.email).then(function (existingClient) {
        if (existingClient) {
            var err = new _APIError2.default('Error: Client Already Exists', _httpStatus2.default.FORBIDDEN, true);
            return next(err);
        } else {
            var client = new _models.Client({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                birth: req.body.birth,
                sex: req.body.sex,
                insurance: req.body.insurance,
                status: 1
            }).save().then(function (savedClient) {
                //asynchronously add client to current professional
                _models.Professional.findOneAndUpdate({ email: req.locals.sessionUserEmail }, { $push: { clients: savedClient } }, function (err, result) {});

                //check if user already exists
                _models.User.getByEmail(req.body.email).then(function (existingUser) {
                    if (existingUser && existingUser.length > 0) {
                        existingUser.client = savedClient._id;
                        existingUser.update().then(function (savedUser) {
                            return res.json(savedClient);
                        });
                    } else {
                        //create new user.  Attach client
                        var user = new _models.User({
                            role: _constants2.default.roles.Client,
                            email: req.body.email,
                            password: _constants2.default.defaultPassword,
                            client: savedClient._id
                        }).save().then(function (savedUser) {
                            return res.json(savedClient);
                        }).catch(function (e) {
                            return next(e);
                        });
                    }
                }).catch(function (e) {
                    return next(e);
                });
            }).catch(function (e) {
                return next(e);
            });
        }
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing client
* @property {string} req.body.email - The email of client.
* @returns {Client}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    var client = req.client;
    client.email = req.body.email;
    client.firstname = req.body.firstname;
    client.lastname = req.body.lastname;
    client.insurance = req.body.insurance;
    client.sex = req.body.sex;
    client.birth = req.body.birth;

    client.save().then(function (savedClient) {
        return res.json(savedClient);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get client list.
* @property {number} req.query.skip - Number of clients to be skipped.
* @property {number} req.query.limit - Limit number of clients to be returned.
* @returns {Client[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    _models.Client.list({ limit: limit, skip: skip }).then(function (clients) {
        return res.json(clients);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete client.
* @returns {Client}
*/
function remove(req, res, next) {
    var client = req.client;
    client.remove().then(function (deletedClient) {
        return res.json(deletedClient);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=client-controller.js.map