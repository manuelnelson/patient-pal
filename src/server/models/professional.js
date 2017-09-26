import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const ProfessionalSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        validate: [ validator.isEmail, 'invalid email' ],
        unique: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    title: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization'
    },
    clients:[{type:mongoose.Schema.ObjectId,ref:'Client'}],
    //1 = active, 0 = disabled or disactive
    status: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
ProfessionalSchema.statics = {
    /**
    * Get Professional
    * @param {ObjectId} email - The email of Professional.
    * @returns {Promise<Professional, APIError>}
    */
    get(id) {
        return this.findById(id)
        .populate('clients organization')
        .exec()
        .then((Professional) => {
            if (Professional) {
                return Professional;
            }
            return null;
            // const err = new APIError('No such Professional exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },
    /**
    * Get Professional by Email
    * @param {string} email - The email of Professional.
    * @returns {Promise<Professional, APIError>}
    */
    getByEmail(email) {
        return this.findOne({email:email})
        .populate('clients')
        .exec().then((Professional) => {
            if (Professional) {
                return Professional;
            }
            return null;
            // const err = new APIError('No such Professional exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List Professionals in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Professionals to be skipped.
    * @param {number} limit - Limit number of Professionals to be returned.
    * @returns {Promise<Professional[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Professional', ProfessionalSchema);
