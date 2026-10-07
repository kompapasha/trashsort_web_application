import { validationResult } from 'express-validator';

export default (req, res, next) => {
    const anyErrors = validationResult(req);
    if(!anyErrors.isEmpty()) {
        return res.status(400).json(anyErrors.array());
    }
    next();
};