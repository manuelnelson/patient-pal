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
* Load professional and append to req.
*/
function load(req, res, next, userId) {
    _models.Professional.get(userId).then(function (professional) {
        req.professional = professional;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get professional
* @returns {Professional}
*/
function get(req, res) {
    return res.json(req.professional);
}

/**
* Get professional's Appointments
* @returns {Appointment[]}
*/
function getAppointments(req, res, next) {
    _models.Appointment.find({ professional: req.professional._id }).populate('client').sort('startDate').exec().then(function (appointments) {
        return res.json(appointments);
    });
}

/**
* Checks if user exists with same email as professional.  If not, it creates a new User with the email provided and a default password. Then creates the Professional to reside in the new user
* @returns {Professional}
*/
function create(req, res, next) {
    _models.Professional.getByEmail(req.body.email).then(function (existingProfessional) {
        if (existingProfessional) {
            var err = new _APIError2.default('Error: Professional Already Exists', _httpStatus2.default.FORBIDDEN, true);
            return next(err);
        } else {
            var professional = new _models.Professional({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                status: 1
            }).save().then(function (savedProfessional) {
                //check if user already exists
                _models.User.getByEmail(req.body.email).then(function (existingUser) {
                    if (existingUser && existingUser.length > 0) {
                        existingUser.professional = savedProfessional._id;
                        existingUser.update().then(function (savedUser) {
                            return res.json(savedProfessional);
                        });
                    } else {
                        //create new user.  Attach professional
                        var user = new _models.User({
                            role: _constants2.default.roles.Client,
                            email: req.body.email,
                            password: _constants2.default.defaultPassword,
                            professional: savedProfessional._id
                        }).save().then(function (savedUser) {
                            return res.json(savedProfessional);
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
* Update existing professional
* @property {string} req.body.email - The email of professional.
* @returns {Professional}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    var professional = req.professional;
    professional.email = req.body.email;
    professional.firstName = req.body.firstName;
    professional.lastName = req.body.lastName;
    professional.insurance = req.body.insurance;
    professional.sex = req.body.sex;
    professional.birth = req.body.birth;

    professional.save().then(function (savedProfessional) {
        return res.json(savedProfessional);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get professional list.
* @property {number} req.query.skip - Number of professionals to be skipped.
* @property {number} req.query.limit - Limit number of professionals to be returned.
* @returns {Professional[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 50 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    _models.Professional.list({ limit: limit, skip: skip }).then(function (professionals) {
        return res.json(professionals);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete professional.
* @returns {Professional}
*/
function remove(req, res, next) {
    var professional = req.professional;
    professional.remove().then(function (deletedProfessional) {
        return res.json(deletedProfessional);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, getAppointments: getAppointments };
//# sourceMappingURL=professional-controller.js.map