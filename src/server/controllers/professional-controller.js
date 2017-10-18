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
    let queryObj = {
        professional: req.professional._id,
        startDate: {$gt: new Date()}
    };
    if(req.query.month){
        queryObj.startDate = {
            $gt: new Date(req.query.year,req.query.month,1),
            $lt: new Date(req.query.year,req.query.month,31) 
        }
    }
    Appointment.find(queryObj)
        .populate('client')
        .sort('startDate')
        .exec()
        .then(appointments => res.json(appointments));
}

/**
* Checks if user exists with same email as professional.  If not, it creates a new User with the email provided and a default password. Then creates the Professional to reside in the new user
* @returns {Professional}
*/
function create(req, res, next) {

    return Professional.exists(req.body.email).then(existingProfessional =>{
        if(existingProfessional){
            const err = new APIError('Error: Professional Already Exists', httpStatus.FORBIDDEN, true);
            return next(err);
        }else{
            return new Professional({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                title: req.body.title,
                organization: req.body.organization,
                status: 1
            }).save().then(savedProfessional =>{
                //check if user already exists
                return User.getByEmail(req.body.email)
                .then(existingUser=> {
                    if(existingUser && existingUser.length > 0)
                    {
                        existingUser.professional = savedProfessional._id;
                        return existingUser.update().then(savedUser => {
                            //return userid with professional
                            let savedObj = savedProfessional.toObject();
                            savedObj.userId = savedUser._id;
                            return res.json(savedObj);
                        });
                    } else {
                        //create new user.  Attach professional
                        return new User({
                            role: Constants.roles.Professional,
                            email: req.body.email,
                            password: Constants.defaultPassword,
                            professional: savedProfessional._id
                        }).save().then(savedUser => {
                            //return userid with professional
                            let savedObj = savedProfessional.toObject();
                            savedObj.userId = savedUser._id;
                            return res.json(savedObj);
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
    let professional = req.professional;
    
    // professional.email = req.body.email;
    professional.firstname = req.body.firstname;
    professional.lastname = req.body.lastname;
    professional.title = req.body.title;

    return professional.save()
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
    let queryObj = buildQuery(req);
    
    return Professional.find(queryObj.length > 0 ? {$or: queryObj} : {})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(professionals => res.json(professionals))
    .catch(e => next(e));
}

function buildQuery(req){
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        // if (_.indexOf(dateKeys, key) > -1) {
        //     if (key == 'startDate') {
        //         array.push({ createdAt: { $gt: req.query[key] } });
        //     }
        //     if (key == 'endDate') array.push({ createdAt: { $lt: req.query[key] } });
        // } else {
            var obj = {};
            obj[key] = req.query[key];
            array.push(obj);
        // }
    }
    return array;
}

function uploadPhoto(req,res,next){
    let professional = req.professional;
    console.log(req.file)
    professional.imageUrl = req.file.location;

    return professional.save()
    .then(savedProfessional => res.json(savedProfessional))
    .catch(e => next(e));
}

/**
* Delete professional.
* @returns {Professional}
*/
function remove(req, res, next) {
    const professional = req.professional;
    return professional.remove()
    .then(deletedProfessional => res.json(deletedProfessional))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getAppointments, uploadPhoto };
