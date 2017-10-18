import {Appointment} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
import * as _ from 'lodash';

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
    return req.appointment;
}

/**
* Checks if user exists with same email as appointment.  If not, it creates a new User with the email provided and a default password. Then creates the Appointment to reside in the new user
* @returns {Appointment}
*/
function create(req, res, next) {
   return new Appointment(req.body)
        .save()
        .then(savedAppointment => savedAppointment)
        .catch(e => next(e));
}

/**
* Update existing appointment
* @returns {Appointment}
*/
function update(req, res, next) {
    const appointment = req.appointment;
    for(let prop in req.body){
        appointment[prop] = req.body[prop];
    }
    return appointment.save()
    .then(savedAppointment => savedAppointment)
    .catch(e => next(e));
}

/**
* Get appointment list.
* @property {number} req.query.skip - Number of appointments to be skipped.
* @property {number} req.query.limit - Limit number of appointments to be returned.
* @returns {Appointment[]}
*/
function list(req, res, next) {
    const { limit = 10, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let query = Appointment;
    query = buildQuery(req, query);
    return query.skip(parseInt(skip)).limit(parseInt(limit))
    .populate('client professional')
    .sort('startDate')
    .then(appointments => appointments)
    .catch(e => next(e));
}

//list of fields that are relationships of type many
let dateKeys = ['startDate', 'endDate'];

//builds a query for 
function buildQuery(req, query){
    if(Object.keys(req.query).length === 0)
        return query.find();
    //otherwise it runs it as an OR statement
    let seriesObj = {};
    for(let key in req.query){
        let obj = {};
        if(_.indexOf(dateKeys, key) > -1){
            if(key == 'startDate')
                obj[key] = {$gt: req.query[key]};
            if(key == 'endDate')
                obj[key] = {$lt: req.query[key]};
            query = query.find(obj);    
        } else{
            seriesObj[key] = req.query[key];
        }
    }
    if(Object.keys(seriesObj).length > 0)
        query = query.find(seriesObj);
    return query;
}

/**
* Delete appointment.
* @returns {Appointment}
*/
function remove(req, res, next) {
    const appointment = req.appointment;
    return appointment.remove()
    .then(deletedAppointment => deletedAppointment)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
