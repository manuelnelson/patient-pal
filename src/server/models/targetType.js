import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const TargetTypeSchema = new mongoose.Schema({
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
TargetTypeSchema.statics = {
    /**
    * Get TargetType
    * @param {ObjectId} id - The objectId of TargetType.
    * @returns {Promise<TargetType, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((TargetType) => {
            if (TargetType) {
                return TargetType;
            }
            return null;
            // const err = new APIError('No such TargetType exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List TargetTypes in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of TargetTypes to be skipped.
    * @param {number} limit - Limit number of TargetTypes to be returned.
    * @returns {Promise<TargetType[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort('name')
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('TargetType', TargetTypeSchema);
