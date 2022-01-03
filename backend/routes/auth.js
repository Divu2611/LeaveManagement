const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const router = express();

const {User} = require('../models/users');
const {Employee} = require('../models/employees');

router.post("/",async (req,res) => {

    const {error} = areValidCredentials(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const user = await User.findOne({
        email: req.body.email
    });
    if(!user){
        return res.status(400).send("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.status(400).send("Invalid email or password");
    }

    const employee = await Employee.findOne({
        email: req.body.email
    });

    if(employee){
        res.send({
            user: user.generateAuthToken(),
            employee: employee.generateEmpToken()
        })
    }else{
        res.send({
            user: user.generateAuthToken()
        });
    }
});

function areValidCredentials(body){
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(body);
}

exports.router = router;

