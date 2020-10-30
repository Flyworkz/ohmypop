const Joi = require('joi');

const insertPopSchema = Joi.object({
    figurine_number: Joi.number().integer().min(1).required(),
    collection: Joi.string().required(),
    label: Joi.string().required(),
    status: Joi.bool().required()
});

const updatePopSchema = Joi.object({
    id: Joi.number().integer().min(1),
    figurine_number: Joi.number().integer().min(1),
    collection: Joi.string(),
    label: Joi.string(),
    status: Joi.bool()
});

module.exports = { insertPopSchema, updatePopSchema }; 