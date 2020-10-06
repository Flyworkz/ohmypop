const Joi = require('joi');

const popSchema = Joi.object({
    id: Joi.number().integer().min(1),
    figurine_number: Joi.number().integer().min(1).required(),
    collection: Joi.string().required(),
    label: Joi.string().required(),
    status: Joi.bool().required()
});

module.exports = popSchema; 