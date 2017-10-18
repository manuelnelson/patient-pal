import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const targetTypeSchema = new mongoose.Schema({
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
targetTypeSchema.statics = {
    /**
    * Get targetType
    * @param {ObjectId} id - The objectId of targetType.
    * @returns {Promise<targetType, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((targetType) => {
            if (targetType) {
                return targetType;
            }
            else{
                const err = new APIError('No such targetType exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);    
            }
        });
    },

    /**
    * List targetTypes in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of targetTypes to be skipped.
    * @param {number} limit - Limit number of targetTypes to be returned.
    * @returns {Promise<targetType[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort('-name')
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('TargetType', targetTypeSchema);
