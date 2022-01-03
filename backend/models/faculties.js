const mongoose = require("mongoose");
const Joi = require('joi');

const Faculty = mongoose.model("Faculty",mongoose.Schema({
    personal:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            dateOfBirth: {
                type: String,
                required: true
            },
            designation: {
                type: String,
                required: true
            },
            department: {
                type: String,
                required: true
            },
        }),
        required: true
    },
    contact: {
        type: new mongoose.Schema({
            address: {
                type: new mongoose.Schema({
                    office:{
                        type: String,
                        required:true
                    },
                    city:{
                        type: String,
                        required:true
                    },
                    state:{
                        type: String,
                        required:true
                    },
                    country:{
                        type: String,
                        required:true
                    }
                }),
                required: true
            },
            email:{
                type: String,
                required: true
            },
            phone: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    academic:{
        type: new mongoose.Schema({
            highestEducation: {
                type: new mongoose.Schema({
                    degree: {
                        type: String,
                        required: true
                    },
                    institute: {
                        type: String,
                        required: true
                    },
                    year:{
                        type: Number,
                        required: true
                    }
                }),
                required: true
            }
        }),
        required: true
    },
    publications:{
        type: new mongoose.Schema({
            researchArea: {
                type: String,
                required: true
            },
            publications: {
                type: [String],
                default: null,
                required: true 
            }
        }),
        required: true
    }
}));

function isValidFaculty(body){
    const schema = Joi.object({
        personal: Joi.object({
            name: Joi.string().required(),
            dateOfBirth: Joi.string().required(),
            designation: Joi.string().required(),
            department: Joi.string().required()
        }),
        contact: Joi.object({
            address: Joi.object({
                office: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                country: Joi.string().required()
            }),
            phone: Joi.number().required(),
            email: Joi.string().required()
        }),
        academic: Joi.object({
            highestEducation: Joi.object({
                degree: Joi.string().required(),
                institute: Joi.string().required(),
                year: Joi.number().required()
            })
        }),
        publications: Joi.object({
            researchArea: Joi.string().required(),
            publications: Joi.array().items(Joi.string()).required()
        })
    });

    return schema.validate(body);
}

exports.Faculty = Faculty;
exports.isValidFaculty = isValidFaculty;