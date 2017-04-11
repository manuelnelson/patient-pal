import Joi from 'joi';

export default {
    // POST /api/users
    createUser: {
        body: {
            email: Joi.string().email().required()
        }
    },

    // UPDATE /api/users/:userId
    updateUser: {
        body: {
            email: Joi.string().email().required()
        },
        params: {
            userId: Joi.string().hex().required()
        }
    },

    // POST /api/auth/login
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }
};
