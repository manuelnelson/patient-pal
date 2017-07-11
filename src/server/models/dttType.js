import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const dttTypeSchema = new mongoose.Schema({
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
dttTypeSchema.statics = {
    /**
    * Get dttType
    * @param {ObjectId} id - The objectId of dttType.
    * @returns {Promise<dttType, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((dttType) => {
            if (dttType) {
                return dttType;
            }
            return null;
            // const err = new APIError('No such dttType exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List dttTypes in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of dttTypes to be skipped.
    * @param {number} limit - Limit number of dttTypes to be returned.
    * @returns {Promise<dttType[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('DttType', dttTypeSchema);
