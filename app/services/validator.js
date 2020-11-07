const fs = require('fs');

const validateQuery = (schema) => (request, response, next) => {
    const validatedBody = schema.validate(request.query);

    if (validatedBody.error) {
        response.status(400).json(validatedBody.error);
    } else {
        next();
    }
};

const validateBody = (bodySchema, fileSchema) => (req,res,next) => {

    try {
        const validatedBody = bodySchema.validate(req.body);
        let validatedFile = false;
        if (fileSchema && req.file) {
            validatedFile = fileSchema.validate(req.file);
        }
        if (validatedBody.error) {
            throw new Error(validatedBody.error);
        }
        if (validatedFile.error) {
            throw new Error(validatedFile.error);
        }
        next();
    } catch (err) {
        if (req.file) {
            fs.unlink('public/images/' + req.file.filename, function(err) {
                if (err) throw err;
                console.log('file deleted');
            });
        }
        res.status(400).json(err.message);
    }
}

module.exports = {
    validateBody,
    validateQuery
}; 