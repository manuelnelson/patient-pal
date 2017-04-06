import Joi from 'joi';

export default {
    // POST /api/users
    createUser: {
        body: {
            username: Joi.string().required(),
            email: Joi.string().email().required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            username: Joi.string().required(),
            email: Joi.string().email().required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    }
};
