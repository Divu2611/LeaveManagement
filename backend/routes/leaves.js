const express = require('express');
const router = express();

const {Leave,isValidLeave} = require('../models/leaves');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/",[auth.auth,admin.admin],async (req,res) => {

    const leave = new Leave({
        type: req.body.type
    });

    try{
        const result = await leave.save();
        res.send(result);
    }catch(exception){
        for(error in exception.errors){
            res.send(exception.errors[error].message);
        }
    }
});

router.get("/",async (req,res) => {
    const leaves = await Leave.find();
    res.send(leaves);
});

router.get("/:id",async(req,res) => {

    const leave = await Leave.findById(req.params.id);
    if(!leave){
        return res.status(404).send("Leave not found...");
    }
    
    res.send(leave);
})

exports.router = router;