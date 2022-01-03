const mongoose = require('mongoose');
const Joi = require('joi');

const LeaveRecords = mongoose.model("LeaveRecords",mongoose.Schema({
    employee: {
        type: new mongoose.Schema({
            type: {
                type: String,
                required: true
            },
            type_id:{
                type: String,
                required: true
            },
            name:{
                type: String,
                required: true
            },
            email:{
                type: String,
                required: true
            },
            phone:{
                type: Number,
                required: true
            }
        }),
        required: true
    },

    leave: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    reason: {
        type: String,
        required: function(){
            const leave = this.leave.type;
            return leave === 'Unpaid Leave' || leave === 'Priviledged Leave';
        }
    },

    status: {
        type: String,
        default: "Pending",
        required: function(){
            const leave = this.leave.type;
            return leave === 'Unpaid Leave' || leave === 'Priviledged Leave';
        }
    }
}));

function isValidRecord(body){
    const schema = Joi.object().keys({
        employeeId: Joi.string().required(),
        leave: Joi.string().required().valid("Casual Leave","Unpaid Leave","Privileged Leave"),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        reason: Joi.alternatives().conditional('leave', {is: "Unpaid Leave" || "Privileged Leave", then: Joi.string().required()}),
        status: Joi.alternatives().conditional('leave', {is: "Unpaid Leave" || "Privileged Leave", then: Joi.string().required().default("Pending")})
    });

    return schema.validate(body);
}

exports.LeaveRecords = LeaveRecords;
exports.isValidRecord = isValidRecord