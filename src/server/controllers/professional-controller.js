import jwt from 'jsonwebtoken';
import { Professional, User, Appointment } from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load professional and append to req.
*/
function load(req, res, next, userId) {
    Professional.get(userId)
    .then((professional) => {
        req.professional = professional;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get professional
* @returns {Professional}
*/
function get(req, res) {
    return res.json(req.professional);
}

/**
* Get professional's Appointments
* @returns {Appointment[]}
*/
function getAppointments(req, res, next) {
    Appointment.find({professional: req.professional._id})
        .populate('patient')
        .sort('startDate')
        .exec()
        .then(appointments => res.json(appointments));
}

/**
* Checks if user exists with same email as professional.  If not, it creates a new User with the email provided and a default password. Then creates the Professional to reside in the new user
* @returns {Professional}
*/
function create(req, res, next) {
    Professional.getByEmail(req.body.email).then(existingProfessional =>{
        if(existingProfessional){
            const err = new APIError('Error: Professional Already Exists', httpStatus.FORBIDDEN, true);
            return next(err);
        }else{
            const professional = new Professional({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                status: 1
            }).save().then(savedProfessional =>{
                //check if user already exists
                User.getByEmail(req.body.email)
                .then(existingUser=> {
                    if(existingUser && existingUser.length > 0)
                    {
                        existingUser.professional = savedProfessional._id;
                        existingUser.update().then(savedUser => {
                            return res.json(savedProfessional);
                        });
                    } else {
                        //create new user.  Attach professional
                        const user = new User({
                            role: Constants.roles.Client,
                            email: req.body.email,
                            password: Constants.defaultPassword,
                            professional: savedProfessional._id
                        }).save().then(savedUser => {
                            return res.json(savedProfessional);
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
* Update existing professional
* @property {string} req.body.email - The email of professional.
* @returns {Professional}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    const professional = req.professional;
    professional.email = req.body.email;
    professional.firstName = req.body.firstName;
    professional.lastName = req.body.lastName;
    professional.insurance = req.body.insurance;
    professional.sex = req.body.sex;
    professional.birth = req.body.birth;

    professional.save()
    .then(savedProfessional => res.json(savedProfessional))
    .catch(e => next(e));
}

/**
* Get professional list.
* @property {number} req.query.skip - Number of professionals to be skipped.
* @property {number} req.query.limit - Limit number of professionals to be returned.
* @returns {Professional[]}
*/
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    Professional.list({ limit, skip })
    .then(professionals => res.json(professionals))
    .catch(e => next(e));
}

/**
* Delete professional.
* @returns {Professional}
*/
function remove(req, res, next) {
    const professional = req.professional;
    professional.remove()
    .then(deletedProfessional => res.json(deletedProfessional))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getAppointments };
