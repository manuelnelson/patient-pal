import Joi from 'joi';

export default {
    // POST /api/users
    createClientCurriculum: {
        body: {
            client: Joi.string().required(),
            curriculum: Joi.string().required(),
            appointment: Joi.string().required()
        }
    },
};
