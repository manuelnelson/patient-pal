import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';
import bcrypt from 'bcrypt-nodejs';

const progressReportSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client'
    },
    background: {
        type: String
    },
    medicationList: {
        type: String
    },
    previousTherapy: {
        type: String
    },
    developmentalHistory: {
        type: String
    },
    concernsAtHome: {
        type: String
    },
    targetSummaries:[{type:mongoose.Schema.ObjectId, ref:'TargetSummary'}],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
* Statics
*/
progressReportSchema.statics = {
    /**
    * Get progressReport
    * @param {ObjectId} id - The objectId of progressReport.
    * @returns {Promise<progressReport, APIError>}
    */
    get(id) {
        return this.findById(id)
        .exec()
        .then((progressReport) => {
            if (progressReport) {
                return progressReport;
            }
            else{
                const err = new APIError('No such progressReport exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);    
            }
        });
    },

    /**
    * List progressReports in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of progressReports to be skipped.
    * @param {number} limit - Limit number of progressReports to be returned.
    * @returns {Promise<progressReport[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('ProgressReport', progressReportSchema);
