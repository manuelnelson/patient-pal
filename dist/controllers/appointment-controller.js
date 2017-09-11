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
* Load appointment and append to req.
*/
function load(req, res, next, id) {
    _models.Appointment.get(id).then(function (appointment) {
        req.appointment = appointment;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get appointment
* @returns {Appointment}
*/
function get(req, res) {
    return res.json(req.appointment);
}

/**
* Checks if user exists with same email as appointment.  If not, it creates a new User with the email provided and a default password. Then creates the Appointment to reside in the new user
* @returns {Appointment}
*/
function create(req, res, next) {
    var appointment = new _models.Appointment(req.body).save().then(function (savedAppointment) {
        return res.json(savedAppointment);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing appointment
* @returns {Appointment}
*/
function update(req, res, next) {
    let appointment = req.appointment;
    for (var prop in req.appointment) {
        appointment[prop] = req.appointment[prop];
    }
    appointment.save().then(function (savedAppointment) {
        return res.json(savedAppointment);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get appointment list.
* @property {number} req.query.skip - Number of appointments to be skipped.
* @property {number} req.query.limit - Limit number of appointments to be returned.
* @returns {Appointment[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    _models.Appointment.list({ limit: limit, skip: skip }).then(function (appointments) {
        return res.json(appointments);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete appointment.
* @returns {Appointment}
*/
function remove(req, res, next) {
    var appointment = req.appointment;
    appointment.remove().then(function (deletedAppointment) {
        return res.json(deletedAppointment);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=appointment-controller.js.map