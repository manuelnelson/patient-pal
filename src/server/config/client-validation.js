import Joi from 'joi';

export default {
    // POST /api/users
    createClient: {
        body: {
            firstname: Joi.string().required(),
            lastname: Joi.string().required(), 
            email: Joi.string().email().required(),
            organization: Joi.string().required()
        }
    },
};
