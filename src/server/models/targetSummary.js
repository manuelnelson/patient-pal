import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const targetSummarySchema = new mongoose.Schema({
    skill: {
        type: mongoose.Schema.ObjectId,
        ref: 'Skill'
    },
    clientCurriculum: {
        type: mongoose.Schema.ObjectId,
        ref: 'ClientCurriculum'
    },
    summary: {
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
targetSummarySchema.statics = {
    /**
    * Get targetSummary
    * @param {ObjectId} id - The objectId of targetSummary.
    * @returns {Promise<targetSummary, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((targetSummary) => {
            if (targetSummary) {
                return targetSummary;
            }
            else{
                const err = new APIError('No such targetSummary exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);    
            }
        });
    },

    /**
    * List targetSummarys in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of targetSummarys to be skipped.
    * @param {number} limit - Limit number of targetSummarys to be returned.
    * @returns {Promise<targetSummary[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('TargetSummary', targetSummarySchema);
