import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';


// login schema Joi validation
const loginSchema = Joi.object({
    email: Joi.required(),
    password: Joi.required()
})

export const validateLoginDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: 400,
            message: error.details[0].message
        });
    }
    next();
}

// register schema Joi validation   
const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
export const validateRegisterDto = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: 400,
            message: error.details[0].message
        });
    }
    next();
}