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
    return req.dttType;
}

/**
* Checks if user exists with same email as dttType.  If not, it creates a new User with the email provided and a default password. Then creates the DttType to reside in the new user
* @returns {DttType}
*/
function create(req, res, next) {
   return new DttType(req.body)
        .save()
        .then(savedDttType => savedDttType)
        .catch(e => next(e));
}

/**
* Update existing dttType
* @returns {DttType}
*/
function update(req, res, next) {
    let dttType = req.dttType;
    for(let prop in req.body){
        dttType[prop] = req.body[prop];
    }
    return dttType.save()
    .then(savedDttType => savedDttType)
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
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return DttType.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort('-name')
        .skip(skip)
        .limit(limit)
        .then(dttTypes => dttTypes)
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
* Delete dttType.
* @returns {DttType}
*/
function remove(req, res, next) {
    const dttType = req.dttType;
    return dttType.remove()
    .then(deletedDttType => deletedDttType)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
