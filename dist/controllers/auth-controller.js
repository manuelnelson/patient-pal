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

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _controllers = require('../controllers');

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
            var authToken = createToken(existingUser);
            return res.json(authToken);
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
    return _models.User.getByEmail(req.params.email, true).then(function (user) {
        user.password = req.body.password;
        return user.save().then(function (savedUser) {
            return res.json(savedUser);
        }).catch(function (e) {
            return next(e);
        });
    }).catch(function (e) {
        return next(e);
    });
}

/**
* Send forgot password link if user exists.  Adds a password hash to the user and an expiration
* @property {string} req.body.email - The email of user.
* @returns {User}
*/

function forgotPassword(req, res, next) {
    return _models.User.getByEmail(req.body.email, false).then(function (user) {
        if (!user) {
            var err = new _APIError2.default('Authentication error: No user with that email exists', _httpStatus2.default.UNAUTHORIZED, true);
            return next(err);
        } else {
            return _crypto2.default.randomBytes(20, function (err, buffer) {
                var token = buffer.toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 86400000;
                return user.save().then(function (newUser) {
                    //send email to user with link to change password
                    var context = {
                        url: _config2.default.domain + '/forgot-password?email=' + user.email + '&token=' + token
                    };
                    return _controllers.EmailCtrl.sendEmail(user.email, 'forgot-password', 'Forgot Password help on the way!', context).then(function (message) {
                        return { message: 'The link with the password change has been sent to your email address.' };
                    }).catch(function (e) {
                        var err = new _APIError2.default('Unable to send password link to email address: ' + user.email, _httpStatus2.default.EXPECTATION_FAILED, true);
                        return next(err);
                    });
                }).catch(function (e) {
                    return next(e);
                });
            });
        }
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
    if (_config2.default.env === 'test') return next();

    var token = req.get('Authorization');
    var unsignedToken = _jsonwebtoken2.default.verify(token, _config2.default.jwtSecret);
    req.locals = {
        sessionUserEmail: unsignedToken.email
    };
    next();
}

// creates the token from a user
function createToken(user) {
    var token = _jsonwebtoken2.default.sign({
        email: user.email
    }, _config2.default.jwtSecret);
    var person = user.professional ? user.professional : user.client;
    var organization = user.professional ? user.professional.organization : '';
    return {
        _id: person._id,
        token: token,
        email: user.email,
        role: user.role,
        firstname: user.professional ? user.professional.firstname : user.client.firstname,
        lastname: user.professional ? user.professional.lastname : user.client.lastname,
        organizationId: organization
    };
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
exports.default = { login: login, getRandomNumber: getRandomNumber, verifyToken: verifyToken, updatePassword: updatePassword, createToken: createToken, forgotPassword: forgotPassword };
//# sourceMappingURL=auth-controller.js.map