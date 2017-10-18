import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const skillResultSchema = new mongoose.Schema({
    skill: {
        type: mongoose.Schema.ObjectId,
        ref: 'Skill'
    },
    clientCurriculum: {
        type: mongoose.Schema.ObjectId,
        ref: 'ClientCurriculum'
    },
    trialNumber: {
        type: Number,
        default: 1
    },
    //like all timers, this represents the number of seconds
    timerValue: {
        type: Number
    },
    numberData: {
        type: Number
    },
    stringData: {
        type: String
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
skillResultSchema.statics = {
    /**
    * Get skillResult
    * @param {ObjectId} id - The objectId of skillResult.
    * @returns {Promise<skillResult, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((skillResult) => {
            if (skillResult) {
                return skillResult;
            }
            else{
                const err = new APIError('No such skillResult exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            }
        });
    },

    /**
    * List skillResults in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of skillResults to be skipped.
    * @param {number} limit - Limit number of skillResults to be returned.
    * @returns {Promise<skillResult[]>}
    */
//    list({ skip = 0, limit = 50 } = {}) {
    // list({ skip = 0, limit = 50, query } = {}) {
    //     return this.find(query)
    //     .populate('skill')
    //     .populate( {path:'clientCurriculum', populate: {path: 'curriculum client'}})
    //     .sort({ trialNumber: -1 })
    //     .skip(skip)
    //     .limit(limit)
    //     .exec();
    // }
};


export default mongoose.model('SkillResult', skillResultSchema);
