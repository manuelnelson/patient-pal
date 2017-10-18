import {Skill} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load skill and append to req.
*/
function load(req, res, next, id) {
    Skill.get(id)
    .then((skill) => {
        req.skill = skill;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get skill
* @returns {Skill}
*/
function get(req, res) {
    return req.skill;
}

/**
* Get skill
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword,'ig')
    Skill.find({
        targetName: {
            $regex: regex
        },
        organization: req.query.organization
    })
    .then((skills) => skills)
    .catch(e => next(e));
}

/**
* Checks if user exists with same email as skill.  If not, it creates a new User with the email provided and a default password. Then creates the Skill to reside in the new user
* @returns {Skill}
*/
function create(req, res, next) {
    return new Skill(req.body)
        .save()
        .then(savedSkill => savedSkill)
        .catch(e => next(e));
}

/**
* Update existing skill
* @returns {Skill}
*/
function update(req, res, next) {
    const skill = req.skill;
    for(let prop in req.body){
        skill[prop] = req.body[prop];
    }
    return skill.save()
    .then(savedSkill => savedSkill)
    .catch(e => next(e));
}

/**
* Get skill list.
* @property {number} req.query.skip - Number of skills to be skipped.
* @property {number} req.query.limit - Limit number of skills to be returned.
* @returns {Skill[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;

    let queryObj = buildQuery(req);
    
    return Skill.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then(skills => skills)
        .catch(e => next(e));


    // Skill.list({ limit, skip })
    // .then(skills => res.json(skills))
    // .catch(e => next(e));
}

function buildQuery(req){
    if (Object.keys(req.query).length === 0) return [];
    var array = [];
    for (var key in req.query) {
        var obj = {};
        obj[key] = req.query[key];
        array.push(obj);
    }
    return array;
}


/**
* Delete skill.
* @returns {Skill}
*/
function remove(req, res, next) {
    const skill = req.skill;
    return skill.remove()
    .then(deletedSkill => deletedSkill)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, search };
