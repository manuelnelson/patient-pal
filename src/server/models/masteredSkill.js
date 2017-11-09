import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const masteredSkillSchema = new mongoose.Schema({
    skill: {
        type: mongoose.Schema.ObjectId,
        ref: 'Skill'
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client'
    },
    curriculum: {
        type: mongoose.Schema.ObjectId,
        ref: 'Curriculum'
    },
    numberOfTrials:{
        type: Number
    },
    started: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
masteredSkillSchema.statics = {
    /**
    * Get masteredSkill
    * @param {ObjectId} id - The objectId of masteredSkill.
    * @returns {Promise<masteredSkill, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((masteredSkill) => {
            if (masteredSkill) {
                return masteredSkill;
            }
            else{
                const err = new APIError('No such masteredSkill exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);    
            }
        });
    },

    /**
    * List masteredSkills in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of masteredSkills to be skipped.
    * @param {number} limit - Limit number of masteredSkills to be returned.
    * @returns {Promise<masteredSkill[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('masteredSkill', masteredSkillSchema);
