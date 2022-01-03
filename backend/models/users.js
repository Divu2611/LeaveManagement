const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const config = require('config');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        min: 8
    },

    isAdmin:{
        type:Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function(){
    return token = jwt.sign({
        ID: this._id,
        Name: this.name,
        EMail: this.email,
        isAdmin: this.isAdmin,
    },config.get("jwtPrivateKey"));
}

const User = mongoose.model("User",userSchema);

function isValidUser(body){
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(body);
}

exports.User = User;
exports.isValidUser = isValidUser;
