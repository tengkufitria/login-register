const Joi = require('joi');
const authController = require('./authController'); // Import controller

module.exports = [
    {
        method: 'POST',
        path: '/api/auth/register',
        options: {
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().messages({
                        'string.empty': 'Name is required',
                    }),
                    email: Joi.string().email().required().messages({
                        'string.empty': 'Email is required',
                        'string.email': 'Email must be a valid email address',
                    }),
                    password: Joi.string().min(6).required().messages({
                        'string.empty': 'Password is required',
                        'string.min': 'Password must be at least 6 characters long',
                    }),
                    gender: Joi.string().valid('male', 'female', 'other').required().messages({
                        'string.empty': 'Gender is required',
                        'any.only': 'Gender must be one of "male", "female", or "other"',
                    }),
                    date_of_birth: Joi.date().required().messages({
                        'date.base': 'Date of Birth must be a valid date',
                        'any.required': 'Date of Birth is required',
                    }),
                }),
                failAction: (request, h, error) => {
                    return h.response({ message: error.details[0].message }).code(400).takeover();
                },
            },
        },
        handler: authController.registerUser, // Panggil controller
    },
];
