import {DttType} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load dttType and append to req.
*/
function load(req, res, next, id) {
    DttType.get(id)
    .then((dttType) => {
        req.dttType = dttType;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get dttType
* @returns {DttType}
*/
function get(req, res) {
    return res.json(req.dttType);
}

/**
* Checks if user exists with same email as dttType.  If not, it creates a new User with the email provided and a default password. Then creates the DttType to reside in the new user
* @returns {DttType}
*/
function create(req, res, next) {
    const dttType = new DttType(req.body)
        .save()
        .then(savedDttType => res.json(savedDttType))
        .catch(e => next(e));
}

/**
* Update existing dttType
* @returns {DttType}
*/
function update(req, res, next) {
    const dttType = req.dttType;
    for(let prop in req.dttType){
        dttType[prop] = req.dttType[prop];
    }
    dttType.save()
    .then(savedDttType => res.json(savedDttType))
    .catch(e => next(e));
}

/**
* Get dttType list.
* @property {number} req.query.skip - Number of dttTypes to be skipped.
* @property {number} req.query.limit - Limit number of dttTypes to be returned.
* @returns {DttType[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    DttType.list({ limit, skip })
    .then(dttTypes => res.json(dttTypes))
    .catch(e => next(e));
}

/**
* Delete dttType.
* @returns {DttType}
*/
function remove(req, res, next) {
    const dttType = req.dttType;
    dttType.remove()
    .then(deletedDttType => res.json(deletedDttType))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
