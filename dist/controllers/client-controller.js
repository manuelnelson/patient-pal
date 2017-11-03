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
    return req.client;
}

/**
* Get client's Appointments
* @returns {Appointment[]}
*/
function getAppointments(req, res, next) {
    return _models.Appointment.find({ client: req.client._id }).populate('client professional').sort('startDate').exec().then(function (appointments) {
        return appointments;
    });
}

/**
* Checks if user exists with same email as client.  If not, it creates a new User with the email provided and a default password. Then creates the Client to reside in the new user
* @returns {Client}
*/
function create(req, res, next) {
    return _models.Client.exists(req.body.email).then(function (existingClient) {
        if (existingClient) {
            var err = new _APIError2.default('Error: Client Already Exists', _httpStatus2.default.FORBIDDEN, true);
            return next(err);
        } else {
            var client = new _models.Client(req.body);
            client.status = 1;
            return client.save().then(function (savedClient) {
                //check if user already exists
                return _models.User.getByEmail(req.body.email).then(function (existingUser) {
                    if (existingUser && existingUser.length > 0) {
                        existingUser.client = savedClient._id;
                        return existingUser.update().then(function (savedUser) {
                            //return userid with professional
                            var savedObj = savedClient.toObject();
                            savedObj.userId = savedUser._id;
                            return savedObj;
                        });
                    } else {
                        //create new user.  Attach client
                        return new _models.User({
                            role: _constants2.default.roles.Client,
                            email: req.body.email,
                            password: _constants2.default.defaultPassword,
                            client: savedClient._id
                        }).save().then(function (savedUser) {
                            var savedObj = savedClient.toObject();
                            savedObj.userId = savedUser._id;
                            return savedObj;
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
    var client = req.client;
    for (var prop in req.body) {
        client[prop] = req.body[prop];
    }
    return client.save().then(function (savedClient) {
        return savedClient;
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

    delete req.query.limit;
    delete req.query.skip;
    var queryObj = buildQuery(req);

    return _models.Client.find(queryObj.length > 0 ? { $and: queryObj } : {}).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (clients) {
        return clients;
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
* Delete client.
* @returns {Client}
*/
function remove(req, res, next) {
    var client = req.client;
    return client.remove().then(function (deletedClient) {
        return deletedClient;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, getAppointments: getAppointments };
//# sourceMappingURL=client-controller.js.map