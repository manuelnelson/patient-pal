import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const ddtTypeSchema = new mongoose.Schema({
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
ddtTypeSchema.statics = {
    /**
    * Get ddtType
    * @param {ObjectId} id - The objectId of ddtType.
    * @returns {Promise<ddtType, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((ddtType) => {
            if (ddtType) {
                return ddtType;
            }
            return null;
            // const err = new APIError('No such ddtType exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List ddtTypes in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of ddtTypes to be skipped.
    * @param {number} limit - Limit number of ddtTypes to be returned.
    * @returns {Promise<ddtType[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('DdtType', ddtTypeSchema);
