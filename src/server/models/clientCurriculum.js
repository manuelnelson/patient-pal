import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const clientCurriculumSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Patient',
        required:true
    },
    curriculum: {
        type: mongoose.Schema.ObjectId,
        ref: 'Curriculum',
        required:true
    },
    appointment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Appointment',
        required:true
    },
    completed: {
        type: Boolean
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
clientCurriculumSchema.statics = {
    /**
    * Get clientCurriculum
    * @param {ObjectId} id - The objectId of clientCurriculum.
    * @returns {Promise<clientCurriculum, APIError>}
    */
    get(id) {
        return this.findById(id)
        //Deep populate FTW - TODO look at performance of this
        //https://stackoverflow.com/questions/18867628/mongoose-deep-population-populate-a-populated-field
        .populate({path:'curriculum', populate:{ path: 'skills', populate:{ path: 'targetType dttType'}}})

        .populate({})
        .exec()
        .then((clientCurriculum) => {
            if (clientCurriculum) {
                return clientCurriculum;
            }
            return null;
            // const err = new APIError('No such clientCurriculum exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List clientCurriculums in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of clientCurriculums to be skipped.
    * @param {number} limit - Limit number of clientCurriculums to be returned.
    * @param {number} client - Limit number of clientCurriculums to be returned.
    * @returns {Promise<clientCurriculum[]>}
    */
    list({ client, skip = 0, limit = 50 } = {}) {
        return this.find({
            client: client
        })        
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('ClientCurriculum', clientCurriculumSchema);
