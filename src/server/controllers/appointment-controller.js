import jwt from 'jsonwebtoken';
import Appointment from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load appointment and append to req.
*/
function load(req, res, next, id) {
    Appointment.get(id)
    .then((appointment) => {
        req.appointment = appointment;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get appointment
* @returns {Appointment}
*/
function get(req, res) {
    return res.json(req.appointment);
}

/**
* Checks if user exists with same email as appointment.  If not, it creates a new User with the email provided and a default password. Then creates the Appointment to reside in the new user
* @returns {Appointment}
*/
function create(req, res, next) {
    const appointment = new Appointment(req.body)
        .save()
        .then(savedAppointment => res.json(savedAppointment))
        .catch(e => next(e));
}

/**
* Update existing appointment
* @property {string} req.body.email - The email of appointment.
* @returns {Appointment}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    const appointment = req.appointment;
    appointment.patient = req.body.patient;
    appointment.professional = req.body.professional;
    appointment.date = req.body.date;
    appointment.location = req.body.location;
    appointment.save()
    .then(savedAppointment => res.json(savedAppointment))
    .catch(e => next(e));
}

/**
* Get appointment list.
* @property {number} req.query.skip - Number of appointments to be skipped.
* @property {number} req.query.limit - Limit number of appointments to be returned.
* @returns {Appointment[]}
*/
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Appointment.list({ limit, skip })
    .then(appointments => res.json(appointments))
    .catch(e => next(e));
}

/**
* Delete appointment.
* @returns {Appointment}
*/
function remove(req, res, next) {
    const appointment = req.appointment;
    appointment.remove()
    .then(deletedAppointment => res.json(deletedAppointment))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
