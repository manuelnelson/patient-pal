'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _models = require('../models');

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Returns jwt token if valid username and password is provided
* @param req
* @param res
* @param next
* @returns {*}
*/
function login(req, res, next) {
    if (!req.body.email || !req.body.password) {
        var err = new _APIError2.default('Authentication error: Email and password required', _httpStatus2.default.UNAUTHORIZED, true);
        return next(err);
    }
    _models.User.getByEmail(req.body.email, true).then(function (existingUser) {
        if (!existingUser) {
            var _err = new _APIError2.default('Authentication error: Invalid Credentials', _httpStatus2.default.UNAUTHORIZED, true);
            return next(_err);
        }
        existingUser.comparePassword(req.body.password, function (error, pwdIsValid) {
            if (error) {
                var _err2 = new _APIError2.default('Authentication error', _httpStatus2.default.UNAUTHORIZED, false);
                return next(_err2);
            }
            if (!pwdIsValid) {
                var _err3 = new _APIError2.default('Authentication error: Invalid Credentials ', _httpStatus2.default.UNAUTHORIZED, true);
                return next(_err3);
            }
            var token = _jsonwebtoken2.default.sign({
                email: existingUser.email
            }, _config2.default.jwtSecret);
            var id = existingUser.professional ? existingUser.professional : existingUser.patient;
            return res.json({
                _id: id,
                token: token,
                email: existingUser.email,
                role: existingUser.role
            });
        });
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Update user password
* @property {string} req.body.email - The email of user.
* @returns {User}
*/

function updatePassword(req, res, next) {
    _models.User.getByEmail(req.params.email, true).then(function (user) {
        user.password = req.body.password;
        user.save().then(function (savedUser) {
            return res.json(savedUser);
        }).catch(function (e) {
            return next(e);
        });
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Verifies Authorization token sent in API Request.  If valid, it returns the user email on the req.locals object.
* If invalid, jwt throws an Authorization error
* @param req
* @param res
* @returns {*}
*/
function verifyToken(req, res, next) {
    var token = req.get('Authorization');
    console.log(token);
    var unsignedToken = _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret);
    req.locals = {
        sessionUserEmail: unsignedToken.email
    };
    next();
}

/**
* This is a protected route. Will return random number only if jwt token is provided in header.
* @param req
* @param res
* @returns {*}
*/
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100
    });
}
var AuthCtrl = { login: login, getRandomNumber: getRandomNumber, verifyToken: verifyToken, updatePassword: updatePassword };
exports.default = AuthCtrl;
//# sourceMappingURL=auth-controller.js.map