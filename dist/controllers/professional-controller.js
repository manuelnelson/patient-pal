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
    var queryObj = {
        professional: req.professional._id,
        startDate: { $gt: new Date() }
    };
    if (req.query.month) {
        queryObj.startDate = {
            $gt: new Date(req.query.year, req.query.month, 1),
            $lt: new Date(req.query.year, req.query.month, 31)
        };
    }
    _models.Appointment.find(queryObj).populate('client').sort('startDate').exec().then(function (appointments) {
        return res.json(appointments);
    });
}

/**
* Checks if user exists with same email as professional.  If not, it creates a new User with the email provided and a default password. Then creates the Professional to reside in the new user
* @returns {Professional}
*/
function create(req, res, next) {

    return _models.Professional.exists(req.body.email).then(function (existingProfessional) {
        if (existingProfessional) {
            var err = new _APIError2.default('Error: Professional Already Exists', _httpStatus2.default.FORBIDDEN, true);
            return next(err);
        } else {
            return new _models.Professional({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                title: req.body.title,
                organization: req.body.organization,
                status: 1
            }).save().then(function (savedProfessional) {
                //check if user already exists
                return _models.User.getByEmail(req.body.email).then(function (existingUser) {
                    if (existingUser && existingUser.length > 0) {
                        existingUser.professional = savedProfessional._id;
                        return existingUser.update().then(function (savedUser) {
                            //return userid with professional
                            var savedObj = savedProfessional.toObject();
                            savedObj.userId = savedUser._id;
                            return res.json(savedObj);
                        });
                    } else {
                        //create new user.  Attach professional
                        return new _models.User({
                            role: _constants2.default.roles.Professional,
                            email: req.body.email,
                            password: _constants2.default.defaultPassword,
                            professional: savedProfessional._id
                        }).save().then(function (savedUser) {
                            //return userid with professional
                            var savedObj = savedProfessional.toObject();
                            savedObj.userId = savedUser._id;
                            return res.json(savedObj);
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

    // professional.email = req.body.email;
    professional.firstname = req.body.firstname;
    professional.lastname = req.body.lastname;
    professional.title = req.body.title;

    return professional.save().then(function (savedProfessional) {
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

    var queryObj = buildQuery(req);

    return _models.Professional.find(queryObj.length > 0 ? { $or: queryObj } : {}).sort({ createdAt: -1 }).skip(skip).limit(limit).then(function (professionals) {
        return res.json(professionals);
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

function uploadPhoto(req, res, next) {
    var professional = req.professional;
    professional.imageUrl = req.file.location;

    return professional.save().then(function (savedProfessional) {
        return res.json(savedProfessional);
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
    return professional.remove().then(function (deletedProfessional) {
        return res.json(deletedProfessional);
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Get curriculums by search string
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword, 'ig');
    var nameQuery = {
        $or: [{
            firstname: {
                $regex: regex
            }
        }, {
            lastname: {
                $regex: regex
            }
        }]
    };
    _models.Professional.find({
        $and: [nameQuery, {
            organization: req.query.organization
        }]
    }).then(function (professionals) {
        console.log('professoinals!!');
        console.log(professionals);
        res.json(professionals);
    }).catch(function (e) {
        return next(e);
    });
}

exports.default = { load: load, get: get, create: create, update: update, list: list, remove: remove, getAppointments: getAppointments, uploadPhoto: uploadPhoto, search: search };
//# sourceMappingURL=professional-controller.js.map