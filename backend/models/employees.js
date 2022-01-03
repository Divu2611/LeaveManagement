const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const config = require('config');

const employeeSchema = new mongoose.Schema({
    type:{
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
    },

    type_id:{
        type:String,
        required: true
    },

    leaves: {
        type: new mongoose.Schema({
            casualLeave: Number,
            unPaidLeave: Number,
            privilegedLeave: Number,
        })
    }
});

employeeSchema.methods.generateEmpToken = function(){
    return token = jwt.sign({
        ID: this._id,
        EmployeeType: this.type,
        Name: this.name,
        EMail: this.email,
        Phone: this.phone,
        TypeID: this.type_id
    }, config.get('jwtPrivateKey'));
}

function isValidEmployee(body){
    const schema = Joi.object({
        type: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.number().required(),
        type_id: Joi.string().required(),
        leaves: Joi.object({
            casualLeave: Joi.number(),
            unPaidLeave: Joi.number(),
            privilegedLeave: Joi.number()
        })
    });

    return schema.validate(body)
}

const Employee = mongoose.model("Employee",employeeSchema);

exports.Employee = Employee;
exports.isValidEmployee = isValidEmployee;