import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { User } from '../models';
import APIError from '../lib/APIError';
import config from '../config';

/**
* Returns jwt token if valid username and password is provided
* @param req
* @param res
* @param next
* @returns {*}
*/
function login(req, res, next) {
    if(!req.body.email || !req.body.password){
        const err = new APIError('Authentication error: Email and password required', httpStatus.UNAUTHORIZED, true);
        return next(err);
    }
    User.getByEmail(req.body.email, true)
    .then(existingUser=>{
        if(!existingUser){
            const err = new APIError('Authentication error: Invalid Credentials', httpStatus.UNAUTHORIZED, true);
            return next(err);
        }
        existingUser.comparePassword(req.body.password,function(error,pwdIsValid){
            if(error){
                const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, false);
                return next(err);
            }
            if(!pwdIsValid){
                const err = new APIError('Authentication error: Invalid Credentials ', httpStatus.UNAUTHORIZED, true);
                return next(err);
            }
            const token = jwt.sign({
                email: existingUser.email
            }, config.jwtSecret);
            var id = existingUser.professional ? existingUser.professional : existingUser.patient;
            return res.json({
                _id: id,
                token,
                email: existingUser.email,
                role: existingUser.role
            });
        })
    })
    .catch(e => next(e));
}

/**
* Update user password
* @property {string} req.body.email - The email of user.
* @returns {User}
*/

function updatePassword(req, res, next) {
    User.getByEmail(req.params.email, true)
    .then((user) => {
        user.password = req.body.password;
        user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
* Verifies Authorization token sent in API Request.  If valid, it returns the user email on the req.locals object.
* If invalid, jwt throws an Authorization error
* @param req
* @param res
* @returns {*}
*/
function verifyToken(req,res,next){
    var token = req.get('Authorization');
    console.log(token);
    var unsignedToken = jwt.verify(token,config.jwtSecret);
    req.locals = {
        sessionUserEmail: unsignedToken.email
    };
    next();
}

/**
* This is a protected route. Will return random number only if jwt token is provided in header.
* @param req
* @param res
* @returns {*}
*/
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100
    });
}
let AuthCtrl = { login, getRandomNumber, verifyToken, updatePassword };
export default AuthCtrl;