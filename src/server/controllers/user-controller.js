import jwt from 'jsonwebtoken';
import {User, Professional} from '../models';
import AuthCtrl from './auth-controller';
import OrganizationCtrl from './organization-controller';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import config from '../config';
import constants from '../lib/constants';

/**
* Load user and append to req.
*/
function load(req, res, next, id) {
    User.get(id)
    .then((user) => {
        req.user = user;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get user
* @returns {User}
*/
function get(req, res) {
    return res.json(req.user);
}

/**
* Create new user
* @returns {User}
*/
function create(req, res, next) {
    const user = new User({
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
    });

    //check if user already exists
    return User.getByEmail(user.email)
    .then(existingUser=>{
        if(existingUser)
        {
            const err = new APIError('Authentication error: User Already Exists', httpStatus.UNAUTHORIZED, true);
            return next(err);
        } else {
            user.save()
            .then(savedUser => {
                if(savedUser.role == constants.roles.Professional || savedUser.role == constants.roles.Admin){
                    //get organization if it exists, otherwise create
                    return OrganizationCtrl.list({query: {name: req.body.organization}},res,next).then(org => {
                        if(!org || org.length === 0){
                            return OrganizationCtrl.create({body: {name: req.body.organization, email: req.body.email}},res,next).then(org =>{
                              return createProfessional(req,res,next,savedUser,org);  
                            })        
                        } 
                        return createProfessional(req,res,next,savedUser,org[0]);  
                    })
                }
                else{
                    //create the professional asynchronously
                    return new Client({
                        email: req.body.email,
                        status: 1
                    }).save().then(savedClient =>{
                        savedUser.client = savedClient;
                        savedUser.save();
                        //log user in
                        let authToken = AuthCtrl.createToken(savedUser);
                        return res.json(authToken);
                    });
                    
                }
            })
            .catch(e => next(e));
        }
    })
    .catch(e => next(e));
}

function createProfessional(req,res,next, savedUser, organization){
    return new Professional({
        email: req.body.email,
        organization: organization._id,
        status: 1
    }).save()
    .then(savedProfessional =>{
        savedUser.professional = savedProfessional;
        savedUser.save();
        //log user in
        let authToken = AuthCtrl.createToken(savedUser);
        return res.json(authToken);
    })
    .catch(e => next(e));

}

/**
* Update existing user
* @property {string} req.body.email - The email of user.
* @returns {User}
*/
function update(req, res, next) {
    const user = req.user;
    user.email = req.body.email;

    return user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
* Get user list.
* @property {number} req.query.skip - Number of users to be skipped.
* @property {number} req.query.limit - Limit number of users to be returned.
* @returns {User[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
    return User.find(queryObj.length > 0 ? {$and: queryObj} : {})
        .skip(skip)
        .limit(limit)
        .then(users => res.json(users))
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
* Delete user.
* @returns {User}
*/
function remove(req, res, next) {
    const user = req.user;
    return user.remove().then(deletedUser => {
        return res.json(deletedUser)
    })
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
