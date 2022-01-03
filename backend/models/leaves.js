const mongoose = require('mongoose');
const Joi = require('joi');

const leaveSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    }
})

const Leave = mongoose.model("Leave",leaveSchema);

function isValidLeave(body){
    const schema = Joi.object({
        type: Joi.string().required()
    })

    return schema.validate(body);
}

exports.isValidLeave = isValidLeave;
exports.Leave = Leave
exports.leaveSchema = leaveSchema;