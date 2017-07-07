import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';
import Patient from './patient';
import Professional from './professional';
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [ validator.isEmail, 'invalid email' ],
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
        // match: /(?=.*[a-zA-Z])(?=.*[0-9]+).*/,
        // minlength:
    },
    //admin = 1, office/health professional = 2, patient = 10 (gaps added in case we add more)
    role: {
        type: Number,
        required: true
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient'
    },
    professional: {
        type: mongoose.Schema.ObjectId,
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
UserSchema.pre('save', function(next){
    // we do not want to lose the correct context of the keyword `this`, so let's cache it in a variable called user
    var user = this;
    /* if the user's password has not been modified, do not continue with
    hashing their password....this is for updating a user. If a user does not
    update their password, do not create a new password hash! */
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err,salt){
        // if the user has modified their password, let's hash it
        bcrypt.hash(user.password, salt, function(){},function(err,hashedPassword) {
            if(err){next(err);}
            // then let's set their password to not be the plain text one anymore, but the newly hashed password
            user.password = hashedPassword;
            // then we save the user in the db!
            next();
        }, function(err){
            // or we continue and pass in an error that has happened (which our express error handler will catch)
            return next(err);
        })

    })
});

/* now let's write an instance method for all of our user documents which
will  be used to compare a plain text password with a hashed password
in the database.  */
UserSchema.methods.comparePassword = function(candidatePassword, next) {
    // when this method is called, compare the plain text password with the password in the database.
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return next(err);
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
    get(id) {
        return this.findById(id)
        .exec()
        .then((user) => {
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
    getByEmail(email, includePassword) {
        var query = this.findOne({email:email});
        if(includePassword)
            query = query.select('+password');
        return query.exec().then((user) => {
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
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('User', UserSchema);
