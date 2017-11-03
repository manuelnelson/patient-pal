import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { User } from '../models';
import APIError from '../lib/APIError';
import config from '../config';
import crypto from 'crypto';
import {EmailCtrl} from '../controllers';
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
            let authToken  = createToken(existingUser);
            return res.json(authToken);
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
    return User.getByEmail(req.params.email, true)
    .then((user) => {
        user.password = req.body.password;
        return user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
* Send forgot password link if user exists.  Adds a password hash to the user and an expiration
* @property {string} req.body.email - The email of user.
* @returns {User}
*/

function forgotPassword(req, res, next) {
    return User.getByEmail(req.body.email,false)
    .then((user) => {
        if(!user){
            const err = new APIError('Authentication error: No user with that email exists', httpStatus.UNAUTHORIZED, true);
            return next(err);    
        }else{
            return crypto.randomBytes(20, (err, buffer) => {
                const token = buffer.toString('hex');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 86400000;
                return user.save()
                    .then(newUser => {
                        //send email to user with link to change password
                        const context = {
                            url: `${config.domain}/forgot-password?email=${user.email}&token=${token}`
                        };
                        return EmailCtrl.sendEmail(user.email, 'forgot-password', 'Forgot Password help on the way!',context)
                            .then(message => {
                                return {message: 'The link with the password change has been sent to your email address.'}
                            })
                            .catch(e => {
                                const err = new APIError(`Unable to send password link to email address: ${user.email}`, httpStatus.EXPECTATION_FAILED, true);
                                return next(err);                    
                            });
                        })
                .catch(e => next(e));
            })    
        }
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
    if(config.env === 'test')
        return next();

    var token = req.get('Authorization');
    var unsignedToken = jwt.verify(token,config.jwtSecret);
    req.locals = {
        sessionUserEmail: unsignedToken.email,
    };
    next();
}

// creates the token from a user
function createToken(user){
    const token = jwt.sign({
        email: user.email
    }, config.jwtSecret);
    var person = user.professional ? user.professional : user.client;
    var organization = user.professional ? user.professional.organization : '';
    return {
        _id: person._id,
        token,
        email: user.email,
        role: user.role,
        firstname: user.professional ? user.professional.firstname : user.client.firstname,
        lastname: user.professional ? user.professional.lastname : user.client.lastname,
        organizationId: organization
    };

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
export default { login, getRandomNumber, verifyToken, updatePassword, createToken, forgotPassword };
