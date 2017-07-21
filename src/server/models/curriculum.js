import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const curriculumSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    skills:[{type:mongoose.Schema.ObjectId, ref:'Skill'}],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
curriculumSchema.statics = {
    /**
    * Get curriculum
    * @param {ObjectId} id - The objectId of curriculum.
    * @returns {Promise<curriculum, APIError>}
    */
    get(id) {
        return this.findById(id)
        //Deep populate FTW - TODO look at performance of this
        //https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field
        .populate({path:'skills', populate:{ path: 'targetType'}})
        .exec()
        .then((curriculum) => {
            if (curriculum) {
                return curriculum;
            }
            return null;
            // const err = new APIError('No such curriculum exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List curriculums in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of curriculums to be skipped.
    * @param {number} limit - Limit number of curriculums to be returned.
    * @returns {Promise<curriculum[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Curriculum', curriculumSchema);
