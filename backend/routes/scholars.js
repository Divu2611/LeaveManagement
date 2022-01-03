const express = require('express');
const router = express();

const {Scholar,isValidScholar} = require('../models/scholars');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/",[auth.auth],async(req,res)=>{    
    const newScholar = new Scholar({
        name: req.body.name,
        rollNo: req.body.rollNo,
        email: req.body.email,
        phone: req.body.phone,
        yearAdmission: req.body.yearAdmission,
        researchArea: req.body.researchArea
    });

    const result = await newScholar.save();

    res.send(result);
});

router.get("/",[auth.auth,admin.admin],async(req,res)=>{
    const scholars = await Scholar.find();
    res.send(scholars);
});

router.get("/:id",async(req,res) => {
    const scholar = await Scholar.findById(req.params.id);
    if(!scholar){
        return res.status(404).send("Scholar not found");
    }

    res.send(scholar);
})

router.put("/:id",[auth.auth,admin.admin],async(req,res) => {

    var {error} = isValidScholar(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const updatedScholar = await Scholar.findByIdAndUpdate(req.params.id, {
        $set:{
            name: req.body.name,
            rollNo: req.body.rollNo,
            email:req.body.email,
            phone: req.body.phone,
            yearAdmission: req.body.yearAdmission,
            researchArea: req.body.researchArea
        }
    },{new:true});

    if(!updatedScholar){
        res.status(404).send("Scholar not found");
    }

    res.send(updatedScholar);
});

router.delete("/:id",[auth.auth,admin.admin],async(req,res) => {

    const deletedScholar = await Scholar.findByIdAndDelete(req.params.id);
    if(!deletedScholar){
        return res.status(404).send("Scholar not found");
    }

    res.send(deletedScholar);
});

exports.router = router;
