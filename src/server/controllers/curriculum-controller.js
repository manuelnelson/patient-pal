import {Curriculum} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load curriculum and append to req.
*/
function load(req, res, next, id) {
    Curriculum.get(id)
    .then((curriculum) => {
        req.curriculum = curriculum;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get curriculum
* @returns {Curriculum}
*/
function get(req, res) {
    return req.curriculum;
}

/**
* Checks if user exists with same email as curriculum.  If not, it creates a new User with the email provided and a default password. Then creates the Curriculum to reside in the new user
* @returns {Curriculum}
*/
function create(req, res, next) {
   return new Curriculum(req.body)
        .save()
        .then(savedCurriculum => savedCurriculum)
        .catch(e => next(e));
}

/**
* Update existing curriculum
* @returns {Curriculum}
*/
function update(req, res, next) {
    const curriculum = req.curriculum;
    for(let prop in req.body){
        curriculum[prop] = req.body[prop];
    }
    return curriculum.save()
    .then(savedCurriculum => savedCurriculum)
    .catch(e => next(e));
}

/**
* Get curriculum list.
* @property {number} req.query.skip - Number of curriculums to be skipped.
* @property {number} req.query.limit - Limit number of curriculums to be returned.
* @returns {Curriculum[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return Curriculum.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then(curriculums => curriculums)
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
* Delete curriculum.
* @returns {Curriculum}
*/
function remove(req, res, next) {
    const curriculum = req.curriculum;
    return curriculum.remove()
    .then(deletedCurriculum => deletedCurriculum)
    .catch(e => next(e));
}
/**
* Get skill
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword,'ig')
    Curriculum.find({
        name: {
            $regex: regex
        },
        organization: req.query.organization
    })
    .then((curriculums) => res.json(curriculums))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, search };
