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
    return req.targetType;
}

/**
* Checks if user exists with same email as targetType.  If not, it creates a new User with the email provided and a default password. Then creates the TargetType to reside in the new user
* @returns {TargetType}
*/
function create(req, res, next) {
   return new TargetType(req.body)
        .save()
        .then(savedTargetType => savedTargetType)
        .catch(e => next(e));
}

/**
* Update existing targetType
* @returns {TargetType}
*/
function update(req, res, next) {
    const targetType = req.targetType;
    for(let prop in req.body){
        targetType[prop] = req.body[prop];
    }
    return targetType.save()
    .then(savedTargetType => savedTargetType)
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
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return TargetType.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort('-name')
        .skip(skip)
        .limit(limit)
        .then(targetTypes => targetTypes)
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
* Delete targetType.
* @returns {TargetType}
*/
function remove(req, res, next) {
    const targetType = req.targetType;
    return targetType.remove()
    .then(deletedTargetType => deletedTargetType)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
