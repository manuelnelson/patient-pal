import Joi from 'joi';

export default {
    // POST /api/users
    createCurriculum: {
        body: {
            name: Joi.string().required(),
            //skills: Joi.array().required(),
            organization: Joi.string().required()
        }
    },
};
