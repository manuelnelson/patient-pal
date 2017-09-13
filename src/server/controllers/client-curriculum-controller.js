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
    ClientCurriculum.find({client: req.params.clientId})
    .populate('client appointment curriculum')
    .sort('-createdAt')
    .exec()    
    .then((clientCurriculums) => res.json(clientCurriculums))
    .catch(e => next(e));
}


/**
* Get clientCurriculum
* @returns {ClientCurriculum}
*/
function get(req, res) {
    return res.json(req.clientCurriculum);
}

/**
* Checks if user exists with same email as clientCurriculum.  If not, it creates a new User with the email provided and a default password. Then creates the ClientCurriculum to reside in the new user
* @returns {ClientCurriculum}
*/
function create(req, res, next) {
    const clientCurriculum = new ClientCurriculum(req.body)
        .save()
        .then(savedClientCurriculum => res.json(savedClientCurriculum))
        .catch(e => next(e));
}

/**
* Update existing clientCurriculum
* @returns {ClientCurriculum}
*/
function update(req, res, next) {
    const clientCurriculum = req.clientCurriculum;
    for(let prop in req.clientCurriculum){
        clientCurriculum[prop] = req.clientCurriculum[prop];
    }
    clientCurriculum.save()
    .then(savedClientCurriculum => res.json(savedClientCurriculum))
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
    ClientCurriculum.list({ limit, skip, query: req.query }) 
    .then(clientCurriculums => res.json(clientCurriculums))
    .catch(e => next(e));
}

/**
* Delete clientCurriculum.
* @returns {ClientCurriculum}
*/
function remove(req, res, next) {
    const clientCurriculum = req.clientCurriculum;
    clientCurriculum.remove()
    .then(deletedClientCurriculum => res.json(deletedClientCurriculum))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getByClient };
