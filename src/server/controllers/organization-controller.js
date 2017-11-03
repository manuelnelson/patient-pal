import {Organization} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load organization and append to req.
*/
function load(req, res, next, id) {
    return Organization.get(id)
    .then((organization) => {
        req.organization = organization;
        return next();
    })
    .catch(e => next(e));
}
function getById(req, res, next, id) {
    return Organization.get(id)
    .then((organization) => {
        req.organization = organization;
        return organization;
    })
    .catch(e => next(e));
}

/**
* Get organization
* @returns {Organization}
*/
function get(req, res) {
    return req.organization;
}

/**
* Checks if user exists with same email as organization.  If not, it creates a new User with the email provided and a default password. Then creates the Organization to reside in the new user
* @returns {Organization}
*/
function create(req, res, next) {
    return new Organization(req.body)
        .save()
        .then(savedOrganization => savedOrganization)
        .catch(e => next(e));
}

/**
* Update existing organization
* @returns {Organization}
*/
function update(req, res, next) {
    const organization = req.organization;
    for(let prop in req.body){
        organization[prop] = req.body[prop];
    }
    return organization.save()
    .then(savedOrganization => savedOrganization)
    .catch(e => next(e));
}

/**
* Get organization list.
* @property {number} req.query.skip - Number of organizations to be skipped.
* @property {number} req.query.limit - Limit number of organizations to be returned.
* @returns {Organization[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
    
    return Organization.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then(organizations => organizations)
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

/**
* Delete organization.
* @returns {Organization}
*/
function remove(req, res, next) {
    const organization = req.organization;
    return organization.remove()
    .then(deletedOrganization => deletedOrganization)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getById };
