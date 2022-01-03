const express = require('express');
const bcrypt = require('bcrypt');

const router = express();

const {User,isValidUser} = require('../models/users');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/",async (req,res) => {
    var {error} = isValidUser(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const user = await User.findOne({
        email: req.body.email
    });
    if(user){
        return res.status(400).send("User already exists...");
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password,salt);

    const result = await newUser.save();

    const token = newUser.generateAuthToken();
    
    console.log(result);
    console.log(token);
    res
        .header("x-authToken",token)
        .header("access-control-expose-headers","x-authtoken")
        .send(result);
});

router.get("/me",[auth.auth],async (req,res) => {
    res.send({
        ID: req.user.ID,
        Name: req.user.Name,
        EMail: req.user.EMail
    })
});

router.put("/me",[auth.auth],async(req,res) => {
    var {error} = isValidUser(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const user = await User.findOne({
        email: req.body.email
    });
    if(user){
        return res.status(400).send("User already exists...");
    }

    const getUser = await User.findById(req.user.ID);
    
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(getUser.password,salt);

    getUser.set({
        name: req.body.name,
        email: req.body.email,
        password,
    });

    const result = await getUser.save();

    const token = getUser.generateAuthToken();
    res
        .header("x-authToken",token)
        .header("access-control-expose-headers","x-authtoken")
        .send(result);
});

router.delete("/:id",[auth.auth,admin.admin],async(req,res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if(!deletedUser){
        return res.status(404).send("User not found...");
    }

    res.send(deletedUser);
});

exports.router = router;