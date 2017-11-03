import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const curriculumCategorySchema = new mongoose.Schema({
    name:{
        type: String,
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
curriculumCategorySchema.statics = {
    /**
    * Get curriculumCategory
    * @param {ObjectId} id - The objectId of curriculumCategory.
    * @returns {Promise<curriculumCategory, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((curriculumCategory) => {
            if (curriculumCategory) {
                return curriculumCategory;
            }
            else{
                const err = new APIError('No such curriculumCategory exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);    
            }
        });
    },

    /**
    * List curriculumCategorys in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of curriculumCategorys to be skipped.
    * @param {number} limit - Limit number of curriculumCategorys to be returned.
    * @returns {Promise<curriculumCategory[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('CurriculumCategory', curriculumCategorySchema);
