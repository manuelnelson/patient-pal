import jwt from 'jsonwebtoken';
import {Client, Professional, User, Appointment} from '../models';
import APIError from '../lib/APIError';
import httpStatus from 'http-status';
import Constants from '../lib/constants';
/**
* Load client and append to req.
*/
function load(req, res, next, userId) {
    Client.get(userId)
    .then((client) => {
        req.client = client;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get client
* @returns {Client}
*/
function get(req, res) {
    return res.json(req.client);
}

/**
* Get client's Appointments
* @returns {Appointment[]}
*/
function getAppointments(req, res, next) {
    Appointment.find({client: req.client._id}) 
        .populate('client professional')
        .sort('startDate')
        .exec()
        .then(appointments => res.json(appointments));
}


/**
* Checks if user exists with same email as client.  If not, it creates a new User with the email provided and a default password. Then creates the Client to reside in the new user
* @returns {Client}
*/
function create(req, res, next) {
    Client.getByEmail(req.body.email).then(existingClient =>{
        if(existingClient){
            const err = new APIError('Error: Client Already Exists', httpStatus.FORBIDDEN, true);
            return next(err);
        }else{
            const client = new Client({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                birth: req.body.birth,
                sex: req.body.sex,
                insurance: req.body.insurance,
                status: 1
            }).save().then(savedClient =>{
                //asynchronously add client to current professional
                Professional.findOneAndUpdate({email: req.locals.sessionUserEmail}, {$push:{clients:savedClient}}, (err,result) =>{});

                //check if user already exists
                User.getByEmail(req.body.email)
                .then(existingUser=>{
                    if(existingUser && existingUser.length > 0)
                    {
                        existingUser.client = savedClient._id;
                        existingUser.update().then(savedUser => {
                            return res.json(savedClient);
                        });
                    } else {
                        //create new user.  Attach client
                        const user = new User({
                            role: Constants.roles.Client,
                            email: req.body.email,
                            password: Constants.defaultPassword,
                            client: savedClient._id
                        }).save().then(savedUser => {
                            return res.json(savedClient);
                        })
                        .catch(e => next(e));
                    }
                })
                .catch(e => next(e));
            })
            .catch(e => next(e));

        }
    })
    .catch(e => next(e));
}

/**
* Update existing client
* @property {string} req.body.email - The email of client.
* @returns {Client}
*/
function update(req, res, next) {
    //we may have to get user based off this.
    const client = req.client;
    client.email = req.body.email;
    client.firstname = req.body.firstname;
    client.lastname = req.body.lastname;
    client.insurance = req.body.insurance;
    client.sex = req.body.sex;
    client.birth = req.body.birth;

    client.save()
    .then(savedClient => res.json(savedClient))
    .catch(e => next(e));
}

/**
* Get client list.
* @property {number} req.query.skip - Number of clients to be skipped.
* @property {number} req.query.limit - Limit number of clients to be returned.
* @returns {Client[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;
    Client.list({ limit, skip })
    .then(clients => res.json(clients))
    .catch(e => next(e));
}

/**
* Delete client.
* @returns {Client}
*/
function remove(req, res, next) {
    const client = req.client;
    client.remove()
    .then(deletedClient => res.json(deletedClient))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getAppointments };
