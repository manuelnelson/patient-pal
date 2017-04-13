import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const PatientSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true
    },
    birth: {
        type: Date
    },
    sex: {
        type: String
    },
    insurance: {
        type: String
    },
    //1 = active, 0 = disabled or disactive
    status: {
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
PatientSchema.statics = {
    /**
    * Get Patient
    * @param {ObjectId} id - The objectId of Patient.
    * @returns {Promise<Patient, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((Patient) => {
            if (Patient) {
                return Patient;
            }
            return null;
            // const err = new APIError('No such Patient exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },
    /**
    * Get Patient by Email
    * @param {string} email - The email of Patient.
    * @returns {Promise<Patient, APIError>}
    */
    getByEmail(email) {
        return this.findOne({email:email}).exec().then((Patient) => {
            if (Patient) {
                return Patient;
            }
            return null;
            // const err = new APIError('No such Patient exists!', httpStatus.NOT_FOUND);
            // return Promise.reject(err);
        });
    },

    /**
    * List Patients in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Patients to be skipped.
    * @param {number} limit - Limit number of Patients to be returned.
    * @returns {Promise<Patient[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Patient', PatientSchema);
