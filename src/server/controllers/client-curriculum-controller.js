import {ClientCurriculum} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load clientCurriculum and append to req.
*/
function load(req, res, next, id) {
    ClientCurriculum.get(id)
    .then((clientCurriculum) => {
        req.clientCurriculum = clientCurriculum;
        return next();
    })
    .catch(e => next(e));
}

/**
* Load clientCurriculum and append to req.
*/
function getByClient(req, res, next) {
    return ClientCurriculum.find({client: req.params.clientId})
    .populate('client appointment curriculum')
    .sort('-createdAt')
    .exec()    
    .then((clientCurriculums) => clientCurriculums)
    .catch(e => next(e));
}


/**
* Get clientCurriculum
* @returns {ClientCurriculum}
*/
function get(req, res) {
    return req.clientCurriculum;
}

/**
* Checks if user exists with same email as clientCurriculum.  If not, it creates a new User with the email provided and a default password. Then creates the ClientCurriculum to reside in the new user
* @returns {ClientCurriculum}
*/
function create(req, res, next) {
   return new ClientCurriculum(req.body)
        .save()
        .then(savedClientCurriculum => savedClientCurriculum)
        .catch(e => next(e));
}

/**
* Update existing clientCurriculum
* @returns {ClientCurriculum}
*/
function update(req, res, next) {
    const clientCurriculum = req.clientCurriculum;
    for(let prop in req.body){
        clientCurriculum[prop] = req.body[prop];
    }
    return clientCurriculum.save()
    .then(savedClientCurriculum => savedClientCurriculum)
    .catch(e => next(e));
}

/**
* Get clientCurriculum list.
* @property {number} req.query.skip - Number of clientCurriculums to be skipped.
* @property {number} req.query.limit - Limit number of clientCurriculums to be returned.
* @returns {ClientCurriculum[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return ClientCurriculum.find(queryObj.length > 0 ? {$and: queryObj} : {})
        .sort({ createdAt: -1 })
        .populate('curriculum client appointment')                
        .skip(skip)
        .limit(limit)
        .then(clientCurriculums => clientCurriculums)
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
    console.log(array);
    return array;
}

/**
* Delete clientCurriculum.
* @returns {ClientCurriculum}
*/
function remove(req, res, next) {
    const clientCurriculum = req.clientCurriculum;
    return clientCurriculum.remove()
    .then(deletedClientCurriculum => deletedClientCurriculum)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getByClient };
