import {TargetSummary} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load targetSummary and append to req.
*/
function load(req, res, next, id) {
    TargetSummary.get(id)
    .then((targetSummary) => {
        req.targetSummary = targetSummary;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get targetSummary
* @returns {TargetSummary}
*/
function get(req, res) {
    return req.targetSummary;
}

/**
* Checks if user exists with same email as targetSummary.  If not, it creates a new User with the email provided and a default password. Then creates the TargetSummary to reside in the new user
* @returns {TargetSummary}
*/
function create(req, res, next) {
   return new TargetSummary(req.body)
        .save()
        .then(savedTargetSummary => savedTargetSummary)
        .catch(e => next(e));
}

/**
* Update existing targetSummary
* @returns {TargetSummary}
*/
function update(req, res, next) {
    const targetSummary = req.targetSummary;
    for(let prop in req.body){
        targetSummary[prop] = req.body[prop];
    }
    return targetSummary.save()
    .then(savedTargetSummary => savedTargetSummary)
    .catch(e => next(e));
}

/**
* Get targetSummary list.
* @property {number} req.query.skip - Number of targetSummarys to be skipped.
* @property {number} req.query.limit - Limit number of targetSummarys to be returned.
* @returns {TargetSummary[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return TargetSummary.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then(targetSummarys => targetSummarys)
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
* Delete targetSummary.
* @returns {TargetSummary}
*/
function remove(req, res, next) {
    const targetSummary = req.targetSummary;
    return targetSummary.remove()
    .then(deletedTargetSummary => deletedTargetSummary)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
