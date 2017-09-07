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
* Load patient and append to req.
*/
function load(req, res, next, userId) {
    _models.Patient.get(userId).then(function (patient) {
        req.patient = patient;
        return next();
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get patient
* @returns {Patient}
*/
function get(req, res) {
    return res.json(req.patient);
}

/**
* Checks if user exists with same email as patient.  If not, it creates a new User with the email provided and a default password. Then creates the Patient to reside in the new user
* @returns {Patient}
*/
function create(req, res, next) {
    _models.Patient.getByEmail(req.body.email).then(function (existingPatient) {
        if (existingPatient) {
            var err = new _APIError2.default('Error: Patient Already Exists', _httpStatus2.default.FORBIDDEN, true);
            return next(err);
        } else {
            var patient = new _models.Patient({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                birth: req.body.birth,
                sex: req.body.sex,
                insurance: req.body.insurance,
                status: 1
            }).save().then(function (savedPatient) {
                //asynchronously add patient to current professional
                _models.Professional.findOneAndUpdate({ email: req.locals.sessionUserEmail }, { $push: { patients: savedPatient } }, function (err, result) {});

                //check if user already exists
                _models.User.getByEmail(req.body.email).then(function (existingUser) {
                    if (existingUser && existingUser.length > 0) {
                        existingUser.patient = savedPatient._id;
                        existingUser.update().then(function (savedUser) {
                            return res.json(savedPatient);
                        });
                    } else {
                        //create new user.  Attach patient
                        var user = new _models.User({
                            role: _constants2.default.roles.Client,
                            email: req.body.email,
                            password: _constants2.default.defaultPassword,
                            patient: savedPatient._id
                        }).save().then(function (savedUser) {
                            return res.json(savedPatient);
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
* Update existing patient
* @property {string} req.body.email - The email of patient.
* @returns {Patient}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    var patient = req.patient;
    patient.email = req.body.email;
    patient.firstname = req.body.firstname;
    patient.lastname = req.body.lastname;
    patient.insurance = req.body.insurance;
    patient.sex = req.body.sex;
    patient.birth = req.body.birth;

    patient.save().then(function (savedPatient) {
        return res.json(savedPatient);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get patient list.
* @property {number} req.query.skip - Number of patients to be skipped.
* @property {number} req.query.limit - Limit number of patients to be returned.
* @returns {Patient[]}
*/
function list(req, res, next) {
    var _req$query = req.query,
        _req$query$limit = _req$query.limit,
        limit = _req$query$limit === undefined ? 20 : _req$query$limit,
        _req$query$skip = _req$query.skip,
        skip = _req$query$skip === undefined ? 0 : _req$query$skip;

    _models.Patient.list({ limit: limit, skip: skip }).then(function (patients) {
        return res.json(patients);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Delete patient.
* @returns {Patient}
*/
function remove(req, res, next) {
    var patient = req.patient;
    patient.remove().then(function (deletedPatient) {
        return res.json(deletedPatient);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove };
//# sourceMappingURL=patient-controller.js.map