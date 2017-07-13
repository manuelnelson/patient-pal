import {Appointment} from '../models';
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
* @returns {Appointment}
*/
function update(req, res, next) {
    const appointment = req.appointment;
    for(let prop in req.appointment){
        appointment[prop] = req.appointment[prop];
    }
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
    const { limit = 20, skip = 0 } = req.query;
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
