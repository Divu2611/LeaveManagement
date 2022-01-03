const mongoose = require("mongoose");
const Joi = require('joi');

const Staff = mongoose.model("Staff",mongoose.Schema({
    personal:{
        type: new mongoose.Schema({
            name: {
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
            dateOfJoining: {
                type: String,
                required: true
            }
        }),
        required: true
    },
    contact: {
        type: new mongoose.Schema({
            officeExtension: {
                type: String,
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
    }
}));

function isValidStaff(body){
    const schema = Joi.object({
        personal: Joi.object({
            name: Joi.string().required(),
            designation: Joi.string().required(),
            department: Joi.string().required(),
            dateOfJoining: Joi.string().required()
        }),
        contact: Joi.object({
            officeExtension: Joi.string().required(),
            phone: Joi.number().required(),
            email: Joi.string().required()
        }),
        academic: Joi.object({
            highestEducation: Joi.object({
                degree: Joi.string().required(),
                institute: Joi.string().required(),
                year: Joi.number().required()
            })
        })
    });

    return schema.validate(body);
}

exports.Staff = Staff;
exports.isValidStaff = isValidStaff;