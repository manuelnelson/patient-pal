import Joi from 'joi';

export default {
    // POST /api/users
    createCurriculum: {
        body: {
            skills: Joi.array().required(),
            organization: Joi.string().required()
        }
    },
};
