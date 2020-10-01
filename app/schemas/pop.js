const Joi = require('joi');

const popSchema = Joi.object({
    figurine_label: Joi.number().integer().min(1).required(),
    collection: Joi.string().required(),
    label: Joi.string().required(),
    status: Joi.bool().required()
});

module.exports = popSchema; 