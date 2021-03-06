import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const ClientSchema = new mongoose.Schema({
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
    birth: {
        type: Date
    },
    sex: {
        type: String
    },
    professional: {
        type: mongoose.Schema.ObjectId,
        ref: 'Professional'
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization'
    },
    insurance: {
        type: String
    },
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
ClientSchema.statics = {
    /**
    * Get Client
    * @param {ObjectId} id - The objectId of Client.
    * @returns {Promise<Client, APIError>}
    */
    get(id) {
        return this.findById(id)
        .populate('professional')
        .exec()
        .then((Client) => {
            if (Client) {
                return Client;
            }
            else{
                const err = new APIError('No such Client exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            }
        });
    },
    /**
    * Get Client by Email
    * @param {string} email - The email of Client.
    * @returns {Promise<Client, APIError>}
    */
    getByEmail(email) {
        return this.findOne({email:email}).exec().then((Client) => {
            if (Client) {
                return Client;
            }
            else{
                const err = new APIError('No such Client exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            }
        });
    },

        /**
    * Get Professional by Email
    * @param {string} email - The email of Professional.
    * @returns {Promise<Professional, APIError>}
    */
    exists(email) {
        return this.findOne({email:email})
        .exec().then((Client) => {
            if (Client) {
                return Client;
            }
            return null;
        });
    },


    /**
    * List Clients in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Clients to be skipped.
    * @param {number} limit - Limit number of Clients to be returned.
    * @returns {Promise<Client[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Client', ClientSchema);
