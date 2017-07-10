import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const SkillSchema = new mongoose.Schema({
    targetName: {
        type: String,
        required: true
    },
    goalName: {
        type: String
    },
    stimulus:{
        type: String
    },
    numberOfTrials:{
        type: Number,
        required: true,
        default: 1
    },
    targetType: {
        type: mongoose.Schema.ObjectId,
        ref: 'TargetType'
    },
    //specific to ddt target type and jump-to
    ddtType: {
        type: mongoose.Schema.ObjectId,
        ref: 'ddtType'
    },
    //specific to target types duration (seconds), fluency/rate (amount), whole/partial interval
    //will always store amount in seconds
    interval: {
        type: Number
    },
    //specific to quantity target type
    maxThreshold: {
        type: Number
    },
    //two mastery types, 1 = Automatic, 2 = Manual
    masteryType: {
        type: Number
    },
    targetInstructions:{
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
SkillSchema.statics = {
    /**
    * Get Skill
    * @param {ObjectId} id - The objectId of Skill.
    * @returns {Promise<Skill, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((Skill) => {
            if (Skill) {
                return Skill;
            }
            return null;
            // const err = new APIError('No such Skill exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List Skills in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Skills to be skipped.
    * @param {number} limit - Limit number of Skills to be returned.
    * @returns {Promise<Skill[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Skill', SkillSchema);
