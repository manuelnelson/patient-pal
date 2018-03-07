import {ProgressReport} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load progressReport and append to req.
*/
function load(req, res, next, id) {
    ProgressReport.get(id)
    .then((progressReport) => {
        req.progressReport = progressReport;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get progressReport
* @returns {ProgressReport}
*/
function get(req, res) {
    return req.progressReport;
}

/**
* Checks if user exists with same email as progressReport.  If not, it creates a new User with the email provided and a default password. Then creates the ProgressReport to reside in the new user
* @returns {ProgressReport}
*/
function create(req, res, next) {
   return new ProgressReport(req.body)
        .save()
        .then(savedProgressReport => savedProgressReport)
        .catch(e => next(e));
}

/**
* Update existing progressReport
* @returns {ProgressReport}
*/
function update(req, res, next) {
    const progressReport = req.progressReport;
    for(let prop in req.body){
        progressReport[prop] = req.body[prop];
    }
    return progressReport.save()
    .then(savedProgressReport => savedProgressReport)
    .catch(e => next(e));
}

/**
* Get progressReport list.
* @property {number} req.query.skip - Number of progressReports to be skipped.
* @property {number} req.query.limit - Limit number of progressReports to be returned.
* @returns {ProgressReport[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return ProgressReport.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then(progressReports => progressReports)
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
* Delete progressReport.
* @returns {ProgressReport}
*/
function remove(req, res, next) {
    const progressReport = req.progressReport;
    return progressReport.remove()
    .then(deletedProgressReport => deletedProgressReport)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
