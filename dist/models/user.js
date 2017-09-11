'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _APIError = require('../lib/APIError');

var _APIError2 = _interopRequireDefault(_APIError);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _professional = require('./professional');

var _professional2 = _interopRequireDefault(_professional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
    email: {
        type: String,
        required: true,
        validate: [_validator2.default.isEmail, 'invalid email'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
        // match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        // minlength:
    },
    //admin = 1, office/health professional = 2, client = 10 (gaps added in case we add more)
    role: {
        type: Number,
        required: true
    },
    client: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Client'
    },
    professional: {
        type: _mongoose2.default.Schema.ObjectId,
        ref: 'Professional'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/* the callback function (2nd parameter below) accepts a parameter which we
are calling "next". This is ALSO a callback function that needs to be executed
when we would like to move on from this pre-save hook. If we do not invoke the
"next" function, our server will hang. */
UserSchema.pre('save', function (next) {
    // we do not want to lose the correct context of the keyword `this`, so let's cache it in a variable called user
    var user = this;
    /* if the user's password has not been modified, do not continue with
    hashing their password....this is for updating a user. If a user does not
    update their password, do not create a new password hash! */
    if (!user.isModified('password')) return next();

    _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        // if the user has modified their password, let's hash it
        _bcryptNodejs2.default.hash(user.password, salt, function () {}, function (err, hashedPassword) {
            if (err) {
                next(err);
            }
            // then let's set their password to not be the plain text one anymore, but the newly hashed password
            user.password = hashedPassword;
            // then we save the user in the db!
            next();
        }, function (err) {
            // or we continue and pass in an error that has happened (which our express error handler will catch)
            return next(err);
        });
    });
});

/* now let's write an instance method for all of our user documents which
will  be used to compare a plain text password with a hashed password
in the database.  */
UserSchema.methods.comparePassword = function (candidatePassword, next) {
    // when this method is called, compare the plain text password with the password in the database.
    _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return next(err);
        // isMatch is a boolean which we will pass to our next function
        next(null, isMatch);
    });
};

/**
* Statics
*/
UserSchema.statics = {
    /**
    * Get user
    * @param {ObjectId} id - The objectId of user.
    * @returns {Promise<User, APIError>}
    */
    get: function get(id) {
        return this.findById(id).exec().then(function (user) {
            if (user) {
                return user;
            }
            return null;
            // const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * Get user by Email
    * @param {string} email - The email of user.
    * @param {boolean} includePassword - Whether or not to include .
    * @returns {Promise<User, APIError>}
    */
    getByEmail: function getByEmail(email, includePassword) {
        var query = this.findOne({ email: email });
        if (includePassword) query = query.select('+password');
        return query.exec().then(function (user) {
            if (user) {
                return user;
            }
            return null;
            // const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },


    /**
    * List users in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of users to be skipped.
    * @param {number} limit - Limit number of users to be returned.
    * @returns {Promise<User[]>}
    */
    list: function list() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$skip = _ref.skip,
            skip = _ref$skip === undefined ? 0 : _ref$skip,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 50 : _ref$limit;

        return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    }
};

exports.default = _mongoose2.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map