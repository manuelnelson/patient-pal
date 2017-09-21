import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
organizationSchema.statics = {
    /**
    * Get organization
    * @param {ObjectId} id - The objectId of organization.
    * @returns {Promise<organization, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((organization) => {
            if (organization) {
                return organization;
            }
            return null;
            // const err = new APIError('No such organization exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List organizations in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of organizations to be skipped.
    * @param {number} limit - Limit number of organizations to be returned.
    * @returns {Promise<organization[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Organization', organizationSchema);
