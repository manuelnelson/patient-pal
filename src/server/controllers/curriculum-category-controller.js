import {CurriculumCategory} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load curriculumCategory and append to req.
*/
function load(req, res, next, id) {
    CurriculumCategory.get(id)
    .then((curriculumCategory) => {
        req.curriculumCategory = curriculumCategory;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get curriculumCategory
* @returns {CurriculumCategory}
*/
function get(req, res) {
    return req.curriculumCategory;
}

/**
* check if exists first, if exists, return, otherwise create
* @returns {CurriculumCategory}
*/
function create(req, res, next) {
    return CurriculumCategory.find(req.body).exec()
        .then(result => {
            if(result && result.length > 0){
                return result[0]
            }
            return new CurriculumCategory(req.body)
            .save()
            .then(savedCurriculumCategory => savedCurriculumCategory)
            .catch(e => next(e));
        })
        .catch(e => next(e));
}

/**
* Update existing curriculumCategory
* @returns {CurriculumCategory}
*/
function update(req, res, next) {
    let curriculumCategory = req.curriculumCategory;
    for(let prop in req.body){
        curriculumCategory[prop] = req.body[prop];
    }
    return curriculumCategory.save()
    .then(savedCurriculumCategory => savedCurriculumCategory)
    .catch(e => next(e));
}

/**
* Get curriculumCategory list.
* @property {number} req.query.skip - Number of curriculumCategorys to be skipped.
* @property {number} req.query.limit - Limit number of curriculumCategorys to be returned.
* @returns {CurriculumCategory[]}
*/ 
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    delete req.query.limit;
    delete req.query.skip;    
    let queryObj = buildQuery(req);
        
    return CurriculumCategory.find(queryObj.length > 0 ? {$or: queryObj} : {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .then(curriculumCategorys => curriculumCategorys)
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
* Get skill
* @returns {Skill}
* https://medium.com/@apurvashastry/build-a-cool-database-search-using-these-mongodb-full-text-search-features-on-mongoose-cf2803257f9
*/
function search(req, res, next) {
    var regex = new RegExp(req.params.keyword,'ig')
    return CurriculumCategory.find({
        name: {
            $regex: regex
        },
        organization: req.query.organization
    })
    .exec()
    .then((curriculumCategories) => curriculumCategories)
    .catch(e => next(e));
}


/**
* Delete curriculumCategory.
* @returns {CurriculumCategory}
*/
function remove(req, res, next) {
    const curriculumCategory = req.curriculumCategory;
    return curriculumCategory.remove()
    .then(deletedCurriculumCategory => deletedCurriculumCategory)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, search };
