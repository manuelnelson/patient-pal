import jwt from 'jsonwebtoken';
import Patient from '../models/patient';
import User from '../models/user';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load patient and append to req.
*/
function load(req, res, next, id) {
    Patient.get(id)
    .then((patient) => {
        req.patient = patient;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get patient
* @returns {Patient}
*/
function get(req, res) {
    return res.json(req.patient);
}

/**
* Checks if user exists with same email as patient.  If not, it creates a new User with the email provided and a default password. Then creates the Patient to reside in the new user
* @returns {Patient}
*/
function create(req, res, next) {
    Patient.getByEmail(req.body.email).then(existingPatient =>{
        if(existingPatient){
            const err = new APIError('Error: Patient Already Exists', httpStatus.FORBIDDEN, true);
            return next(err);
        }else{
            const patient = new Patient({
                email: req.body.email,
                birth: req.body.birth,
                sex: req.body.sex,
                insurance: req.body.insurance,
                status: 1
            }).save().then(savedPatient =>{
                //check if user already exists
                User.getByEmail(req.body.email)
                .then(existingUser=>{
                    if(existingUser && existingUser.length > 0)
                    {
                        existingUser.patient = savedPatient._id;
                        existingUser.update().then(savedUser => {
                            return res.json(savedPatient);
                        });
                    } else {
                        //create new user.  Attach patient
                        const user = new User({
                            role: Constants.roles.Client,
                            email: req.body.email,
                            password: Constants.defaultPassword,
                            patient: savedPatient._id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        }).save().then(savedUser => {
                            return res.json(savedPatient);
                        })
                        .catch(e => next(e));
                    }
                })
                .catch(e => next(e));
            })
            .catch(e => next(e));

        }
    })
    .catch(e => next(e));
}

/**
* Update existing patient
* @property {string} req.body.email - The email of patient.
* @returns {Patient}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    const patient = req.patient;
    patient.email = req.body.email;
    patient.firstName = req.body.firstName;
    patient.lastName = req.body.lastName;
    patient.insurance = req.body.insurance;
    patient.sex = req.body.sex;
    patient.birth = req.body.birth;

    patient.save()
    .then(savedPatient => res.json(savedPatient))
    .catch(e => next(e));
}

/**
* Get patient list.
* @property {number} req.query.skip - Number of patients to be skipped.
* @property {number} req.query.limit - Limit number of patients to be returned.
* @returns {Patient[]}
*/
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Patient.list({ limit, skip })
    .then(patients => res.json(patients))
    .catch(e => next(e));
}

/**
* Delete patient.
* @returns {Patient}
*/
function remove(req, res, next) {
    const patient = req.patient;
    patient.remove()
    .then(deletedPatient => res.json(deletedPatient))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
