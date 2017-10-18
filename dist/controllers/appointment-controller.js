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

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
    return req.appointment;
}

/**
* Checks if user exists with same email as appointment.  If not, it creates a new User with the email provided and a default password. Then creates the Appointment to reside in the new user
* @returns {Appointment}
*/
function create(req, res, next) {
    return new _models.Appointment(req.body).save().then(function (savedAppointment) {
        return savedAppointment;
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update existing appointment
* @returns {Appointment}
*/
function update(req, res, next) {
    var appointment = req.appointment;
    for (var prop in req.body) {
        appointment[prop] = req.body[prop];
    }
    return appointment.save().then(function (savedAppointment) {
        return savedAppointment;
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
        limit = _req$query$limit === undefined ? 10 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    delete req.query.limit;
    delete req.query.skip;
    var query = _models.Appointment;
    query = buildQuery(req, query);
    return query.skip(parseInt(skip)).limit(parseInt(limit)).populate('client professional').sort('startDate').then(function (appointments) {
        return appointments;
    }).catch(function (e) {
        return next(e);
    });
}

//list of fields that are relationships of type many
var dateKeys = ['startDate', 'endDate'];

//builds a query for 
function buildQuery(req, query) {
    if (Object.keys(req.query).length === 0) return query.find();
    //otherwise it runs it as an OR statement
    var seriesObj = {};
    for (var key in req.query) {
        var obj = {};
        if (_.indexOf(dateKeys, key) > -1) {
            if (key == 'startDate') obj[key] = { $gt: req.query[key] };
            if (key == 'endDate') obj[key] = { $lt: req.query[key] };
            query = query.find(obj);
        } else {
            seriesObj[key] = req.query[key];
        }
    }
    if (Object.keys(seriesObj).length > 0) query = query.find(seriesObj);
    return query;
}

/**
* Delete appointment.
* @returns {Appointment}
*/
function remove(req, res, next) {
    var appointment = req.appointment;
    return appointment.remove().then(function (deletedAppointment) {
        return deletedAppointment;
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=appointment-controller.js.map