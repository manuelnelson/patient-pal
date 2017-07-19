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
    return res.json(req.curriculum);
}

/**
* Checks if user exists with same email as curriculum.  If not, it creates a new User with the email provided and a default password. Then creates the Curriculum to reside in the new user
* @returns {Curriculum}
*/
function create(req, res, next) {
    const curriculum = new Curriculum(req.body)
        .save()
        .then(savedCurriculum => res.json(savedCurriculum))
        .catch(e => next(e));
}

/**
* Update existing curriculum
* @returns {Curriculum}
*/
function update(req, res, next) {
    const curriculum = req.curriculum;
    for(let prop in req.curriculum){
        curriculum[prop] = req.curriculum[prop];
    }
    curriculum.save()
    .then(savedCurriculum => res.json(savedCurriculum))
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
    Curriculum.list({ limit, skip })
    .then(curriculums => res.json(curriculums))
    .catch(e => next(e));
}

/**
* Delete curriculum.
* @returns {Curriculum}
*/
function remove(req, res, next) {
    const curriculum = req.curriculum;
    curriculum.remove()
    .then(deletedCurriculum => res.json(deletedCurriculum))
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
        }
    })
    .then((curriculums) => res.json(curriculums))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, search };
