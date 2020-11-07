const Joi = require('joi');

const uploadSchema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string(),
    encoding: Joi.string(),
    mimetype: Joi.string(),
    destination: Joi.string(),
    filename: Joi.string(),
    path: Joi.string(),
    size: Joi.number().integer()
});

module.exports = { uploadSchema };