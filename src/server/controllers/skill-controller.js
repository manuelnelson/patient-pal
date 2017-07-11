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
    return res.json(req.skill);
}

/**
* Checks if user exists with same email as skill.  If not, it creates a new User with the email provided and a default password. Then creates the Skill to reside in the new user
* @returns {Skill}
*/
function create(req, res, next) {
    const skill = new Skill(req.body)
        .save()
        .then(savedSkill => res.json(savedSkill))
        .catch(e => next(e));
}

/**
* Update existing skill
* @returns {Skill}
*/
function update(req, res, next) {
    const skill = req.skill;
    for(let prop in req.skill){
        skill[prop] = req.skill[prop];
    }
    skill.save()
    .then(savedSkill => res.json(savedSkill))
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
    Skill.list({ limit, skip })
    .then(skills => res.json(skills))
    .catch(e => next(e));
}

/**
* Delete skill.
* @returns {Skill}
*/
function remove(req, res, next) {
    const skill = req.skill;
    skill.remove()
    .then(deletedSkill => res.json(deletedSkill))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
