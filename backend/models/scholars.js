const mongoose = require("mongoose");
const Joi = require('joi');

const Scholar = mongoose.model("Scholar",mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    yearAdmission: {
        type: Number,
        required: true
    },
    researchArea: {
        type: String,
        required: true
    }
}));

function isValidScholar(body){
    const schema = Joi.object({
        name: Joi.string().required(),
        rollNo: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.number().required(),
        yearAdmission: Joi.number().required(),
        researchArea: Joi.string().required()
    });

    return schema.validate(body);
}

exports.Scholar = Scholar;
exports.isValidScholar = isValidScholar;