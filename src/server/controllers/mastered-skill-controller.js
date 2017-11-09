import {MasteredSkill} from '../models';
import {ClientCurriculumCtrl} from '../controllers';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
import * as _ from 'lodash';
/**
* Load masteredSkill and append to req.
*/
function load(req, res, next, id) {
    MasteredSkill.get(id)
    .then((masteredSkill) => {
        req.masteredSkill = masteredSkill;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get masteredSkill
* @returns {masteredSkill}
*/
function get(req, res) {
    return req.masteredSkill;
}

let dateKeys = ['startDate', 'endDate'];
let clientCurriculumKeys = ['client'];

/**
* Checks if user exists with same email as masteredSkill.  If not, it creates a new User with the email provided and a default password. Then creates the masteredSkill to reside in the new user
* @returns {masteredSkill}
*/
function create(req, res, next) {
    //properties from the request still need to be filled out.
    let query = {query:{client:req.body.client,curriculum:req.body.curriculum}};
    return ClientCurriculumCtrl.list(query,res,next).then(clientCurriculums => {
        if(clientCurriculums && clientCurriculums.length > 0){
            let masteredSkill = {
                curriculum: req.body.curriculum,
                client: req.body.client,
                skill: req.body.skill,
                //start date is the date of the first clientCurriculum
                started: clientCurriculums[0].createdAt,
                numberOfTrials: clientCurriculums.length * parseInt(req.body.numberOfTrials)
            };
            return new MasteredSkill(masteredSkill)
                .save()
                .then(savedmasteredSkill => savedmasteredSkill)
                .catch(e => next(e));
    
        }else{
            return next(new APIError(`There's been an issue trying to master this skill`, httpStatus.BAD_REQUEST, true));            
        }
    })
    .catch(e => next(e));
}

/**
* Update existing masteredSkill
* @returns {masteredSkill}
*/
function update(req, res, next) {
    const masteredSkill = req.masteredSkill;
    for(let prop in req.body){
        masteredSkill[prop] = req.body[prop];
    }
    return masteredSkill.save()
    .then(savedmasteredSkill => savedmasteredSkill)
    .catch(e => next(e));
}

/**
* Get masteredSkill list.
* @property {number} req.query.skip - Number of masteredSkills to be skipped.
* @property {number} req.query.limit - Limit number of masteredSkills to be returned.
* @returns {masteredSkill[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    
    let queryArray = buildQueryObj(req);

//    let queryObj = buildQuery(req);
        
    return MasteredSkill.find(queryArray.length > 0 ? {$or: queryArray} : {})
        .sort({ createdAt: -1 })
        .populate({path:'skill', populate: {path:'targetType dttType'}})
        .populate('client curriculum')
        .skip(skip)
        .limit(limit)
        .then(masteredSkills => masteredSkills)
        .catch(e => next(e));
}
function buildQueryObj(req){
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
* Delete masteredSkill.
* @returns {masteredSkill}
*/
function remove(req, res, next) {
    const masteredSkill = req.masteredSkill;
    return masteredSkill.remove()
    .then(deletedmasteredSkill => deletedmasteredSkill)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
