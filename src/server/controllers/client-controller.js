import jwt from 'jsonwebtoken';
import {Client, Professional, User, Appointment} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load client and append to req.
*/
function load(req, res, next, userId) {
    Client.get(userId)
    .then((client) => {
        req.client = client;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get client
* @returns {Client}
*/
function get(req, res) {
    return req.client;
}

/**
* Get client's Appointments
* @returns {Appointment[]}
*/
function getAppointments(req, res, next) {
    return Appointment.find({client: req.client._id}) 
        .populate('client professional')
        .sort('startDate')
        .exec()
        .then(appointments => appointments);
}


/**
* Checks if user exists with same email as client.  If not, it creates a new User with the email provided and a default password. Then creates the Client to reside in the new user
* @returns {Client}
*/
function create(req, res, next) {
    return Client.exists(req.body.email).then(existingClient =>{
        if(existingClient){
            const err = new APIError('Error: Client Already Exists', httpStatus.FORBIDDEN, true);
            return next(err);
        }else{
            let client = new Client(req.body);
            client.status = 1;
            return client.save().then(savedClient =>{
                //check if user already exists
                return User.getByEmail(req.body.email)
                .then(existingUser=>{
                    if(existingUser && existingUser.length > 0)
                    {
                        existingUser.client = savedClient._id;
                        return existingUser.update().then(savedUser => {
                            //return userid with professional
                            let savedObj = savedClient.toObject();
                            savedObj.userId = savedUser._id;
                            return savedObj;
                        });
                    } else {
                        //create new user.  Attach client
                        return new User({
                            role: Constants.roles.Client,
                            email: req.body.email,
                            password: Constants.defaultPassword,
                            client: savedClient._id
                        }).save().then(savedUser => {
                            let savedObj = savedClient.toObject();
                            savedObj.userId = savedUser._id;
                            return savedObj;
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
* Update existing client
* @property {string} req.body.email - The email of client.
* @returns {Client}
*/
function update(req, res, next) {
    let client = req.client;
    for(let prop in req.body){
        client[prop] = req.body[prop];
    }
    return client.save()
    .then(savedClient => savedClient)
    .catch(e => next(e));
}

/**
* Get client list.
* @property {number} req.query.skip - Number of clients to be skipped.
* @property {number} req.query.limit - Limit number of clients to be returned.
* @returns {Client[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
    
    return Client.find(queryObj.length > 0 ? {$and: queryObj} : {})
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(limit)
        .then(clients => clients)
        .catch(e => next(e));
}

function buildQuery(req){
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        var obj = {};
        obj[key] = req.query[key];
        array.push(obj);
    }
    return array;
}


/**
* Delete client.
* @returns {Client}
*/
function remove(req, res, next) {
    const client = req.client;
    return client.remove()
    .then(deletedClient => deletedClient)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getAppointments };
