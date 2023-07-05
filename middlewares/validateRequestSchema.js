const { validationResult } = require("express-validator");

const validateRequestSchema = (req, res, next) => {
    const errorsInValidation = validationResult(req);
    if (!errorsInValidation.isEmpty()) {
        return res.status(400).json({ errors: errorsInValidation.array() });
    }
    next();
}

module.exports = validateRequestSchema;
