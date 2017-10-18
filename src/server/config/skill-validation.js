import Joi from 'joi';

export default {
    // POST /api/users
    createSkill: {
        body: {
            targetName: Joi.string().required(),
            goalName: Joi.string().required(),
            stimulus: Joi.string().required(),
            numberOfTrials: Joi.number().required(),
            targetType: Joi.string().required(),
            masteryType: Joi.number().required(),
            organization: Joi.string().required()
        }
    },
};
