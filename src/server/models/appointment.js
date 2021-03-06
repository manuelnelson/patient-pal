import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../lib/APIError';
import validator from 'validator';

const AppointmentSchema = new mongoose.Schema({
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client'
    },
    professional: {
        type: mongoose.Schema.ObjectId,
        ref: 'Professional'
    },
    location: {
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
AppointmentSchema.statics = {
    /**
    * Get Appointment
    * @param {ObjectId} id - The objectId of Appointment.
    * @returns {Promise<Appointment, APIError>}
    */
    get(id) {
        return this.findById(id)
        .populate('professional client')
        .exec()
        .then((Appointment) => {
            if (Appointment) {
                return Appointment;
            }
            else{
                const err = new APIError('No such Appointment exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            }
        });
    },

    /**
    * List Appointments in descending order of 'createdAt' timestamp.
    * @param {number} skip - Number of Appointments to be skipped.
    * @param {number} limit - Limit number of Appointments to be returned.
    * @returns {Promise<Appointment[]>}
    */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
    }
};


export default mongoose.model('Appointment', AppointmentSchema);
