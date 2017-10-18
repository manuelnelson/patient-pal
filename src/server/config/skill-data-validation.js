import Joi from 'joi';

export default {
    // POST /api/users
    createSkillData: {
        body: {
            skill: Joi.string().required(),
            clientCurriculum: Joi.string().required(),
            trialNumber: Joi.number().required()
        }
    },
};
