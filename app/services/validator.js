const validateQuery = (schema) => (request, response, next) => {
    const validatedBody = schema.validate(request.query);

    if (validatedBody.error) {
        response.status(400).json(validatedBody.error);
    } else {
        next();
    }
};

const validateBody = (schema) => (request, response, next) => {
    const validatedBody = schema.validate(request.body);

    if (validatedBody.error) {
        response.status(400).json(validatedBody.error);
    } else {
        next();
    }
};

module.exports = {
    validateBody,
    validateQuery
}; 