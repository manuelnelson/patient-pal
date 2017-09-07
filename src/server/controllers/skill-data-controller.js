import {SkillData} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load skillData and append to req.
*/
function load(req, res, next, id) {
    SkillData.get(id)
    .then((skillData) => {
        req.skillData = skillData;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get skillData
* @returns {SkillData}
*/
function get(req, res) {
    return res.json(req.skillData);
}

/**
* Checks if user exists with same email as skillData.  If not, it creates a new User with the email provided and a default password. Then creates the SkillData to reside in the new user
* @returns {SkillData}
*/
function create(req, res, next) {
    const skillData = new SkillData(req.body)
        .save()
        .then(savedSkillData => res.json(savedSkillData))
        .catch(e => next(e));
}

/**
* Update existing skillData
* @returns {SkillData}
*/
function update(req, res, next) {
    const skillData = req.skillData;
    for(let prop in req.skillData){
        skillData[prop] = req.skillData[prop];
    }
    skillData.save()
    .then(savedSkillData => res.json(savedSkillData))
    .catch(e => next(e));
}

/**
* Get skillData list.
* @property {number} req.query.skip - Number of skillDatas to be skipped.
* @property {number} req.query.limit - Limit number of skillDatas to be returned.
* @returns {SkillData[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;
    SkillData.list({ limit, skip, query: req.query })
    .then(skillDatas => res.json(skillDatas))
    .catch(e => next(e));

    //SkillData.list({ limit, skip })
}

/**
* Delete skillData.
* @returns {SkillData}
*/
function remove(req, res, next) {
    const skillData = req.skillData;
    skillData.remove()
    .then(deletedSkillData => res.json(deletedSkillData))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
