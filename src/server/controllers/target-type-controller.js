import {TargetType} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load targetType and append to req.
*/
function load(req, res, next, id) {
    TargetType.get(id)
    .then((targetType) => {
        req.targetType = targetType;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get targetType
* @returns {TargetType}
*/
function get(req, res) {
    return res.json(req.targetType);
}

/**
* Checks if user exists with same email as targetType.  If not, it creates a new User with the email provided and a default password. Then creates the TargetType to reside in the new user
* @returns {TargetType}
*/
function create(req, res, next) {
    const targetType = new TargetType(req.body)
        .save()
        .then(savedTargetType => res.json(savedTargetType))
        .catch(e => next(e));
}

/**
* Update existing targetType
* @returns {TargetType}
*/
function update(req, res, next) {
    const targetType = req.targetType;
    for(let prop in req.targetType){
        targetType[prop] = req.targetType[prop];
    }
    targetType.save()
    .then(savedTargetType => res.json(savedTargetType))
    .catch(e => next(e));
}

/**
* Get targetType list.
* @property {number} req.query.skip - Number of targetTypes to be skipped.
* @property {number} req.query.limit - Limit number of targetTypes to be returned.
* @returns {TargetType[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    TargetType.list({ limit, skip })
    .then(targetTypes => res.json(targetTypes))
    .catch(e => next(e));
}

/**
* Delete targetType.
* @returns {TargetType}
*/
function remove(req, res, next) {
    const targetType = req.targetType;
    targetType.remove()
    .then(deletedTargetType => res.json(deletedTargetType))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
