import {SkillData, ClientCurriculum} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import _ from 'lodash';
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
    return (req.skillData);
}

/**
* Checks if user exists with same email as skillData.  If not, it creates a new User with the email provided and a default password. Then creates the SkillData to reside in the new user
* @returns {SkillData}
*/
function create(req, res, next) {
    return new SkillData(req.body)
        .save()
        .then(savedSkillData => (savedSkillData))
        .catch(e => next(e));
}

/**
* Update existing skillData
* @returns {SkillData}
*/
function update(req, res, next) {
    const skillData = req.skillData;
    for(let prop in req.body){
        skillData[prop] = req.body[prop];
    }
    return skillData.save()
    .then(savedSkillData => (savedSkillData))
    .catch(e => next(e));
}
let dateKeys = ['startDate', 'endDate'];
let clientCurriculumKeys = ['client'];

/**
* Get skillData list.
* @property {number} req.query.skip - Number of skillDatas to be skipped.
* @property {number} req.query.limit - Limit number of skillDatas to be returned.
* @returns {SkillData[]}
*/
// function list(req, res, next) {
//     const { limit = 20, skip = 0 } = req.query;
//     delete req.query.limit;
//     delete req.query.skip;
//     let query = SkillData;
//     query = buildQuery(req, query);
//     return query.populate('skill')
//         .populate( {path:'clientCurriculum', populate: {path: 'curriculum client'}})
//         .sort({ trialNumber: -1 })
//         .skip(parseInt(skip)).limit(parseInt(limit))
//         .exec()
//         .then(skillData => skillData)
//         .catch(e => next(e));
// }

//this query is specific enough i want to separate it out from rest of traditional REST responses
function listReport(req, res, next){
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;
    //if we are searching by client, we need to do a nested query by client curriculum
    let clientId = req.query.client ? req.query.client : null;
    delete req.query.client;

    let query = SkillData;
    let queryArray = buildQueryObj(req, query);
    return ClientCurriculum.find({client: clientId}).exec()
        .then(clientCurriculums => {
            let ids = clientCurriculums.map(curriculum => curriculum._id);  
            queryArray.push({clientCurriculum: {$in: ids}});
            query = query.find({$and: queryArray});
            console.log(queryArray)
            return query.populate('skill')
                .populate( {path:'clientCurriculum', populate: {path: 'curriculum client'}})
                .sort({ trialNumber: -1 })
                .skip(parseInt(skip)).limit(parseInt(limit))
                .exec()
                .then(skillDatas => skillDatas)
                .catch(e => next(e));
        })        
}

//list of fields that are relationships of type many
//builds a query for 
function buildQueryObj(req, query){
    if(Object.keys(req.query).length === 0)
        return [];
    let array = [];
    for(let key in req.query){
        if(_.indexOf(dateKeys, key) > -1){
            if(key == 'startDate'){
                array.push({createdAt: {$gt: req.query[key]}});
            }                
            if(key == 'endDate')
                array.push({createdAt: {$lt: req.query[key]}});
        } 
        else{
            let obj = {};
            obj[key] = req.query[key];
            array.push(obj);
        }
    }
    return array;
}


function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query; 
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
    console.log(queryObj);
    
    return SkillData.find(queryObj.length > 0 ? {$and: queryObj} : {})
        .populate( {path:'clientCurriculum', populate: {path: 'curriculum client'}})
        .populate('skill')
        .sort({ trialNumber: -1 })
        .skip(parseInt(skip)).limit(parseInt(limit))
        .exec()
        .then(skillData => skillData)
        .catch(e => next(e));
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
* Delete skillData.
* @returns {SkillData}
*/
function remove(req, res, next) {
    const skillData = req.skillData;
    return skillData.remove()
    .then(deletedSkillData => (deletedSkillData))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, listReport };
