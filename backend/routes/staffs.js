const express = require('express');
const router = express();

const {Staff,isValidStaff} = require('../models/staffs');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/",[auth.auth],async(req,res)=>{    
    const newStaff = new Staff({
        personal:{
            name: req.body.personal.name,
            designation: req.body.personal.designation,
            department: req.body.personal.department,
            dateOfJoining: req.body.personal.dateOfJoining
        },
        contact:{
            officeExtension: req.body.contact.officeExtension,
            email: req.body.contact.email,
            phone: req.body.contact.phone
        },
        academic:{
            highestEducation: {
                degree: req.body.academic.highestEducation.degree,
                institute: req.body.academic.highestEducation.institute,
                year: req.body.academic.highestEducation.year
            }
        }
    });

    const result = await newStaff.save();

    res.send(result);
});

router.get("/",[auth.auth,admin.admin],async(req,res)=>{
    const staffs = await Staff.find();
    res.send(staffs);
});

router.get("/:id",async(req,res) => {
    const staff = await Staff.findById(req.params.id);
    if(!staff){
        return res.status(404).send("Staff not found");
    }

    res.send(staff);
})

router.put("/:id",[auth.auth,admin.admin],async(req,res) => {

    var {error} = isValidStaff(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, {
        $set:{
            personal:{
                name: req.body.personal.name,
                designation: req.body.personal.designation,
                department: req.body.personal.department,
                dateOfJoining: req.body.personal.dateOfJoining
            },
            contact:{
                officeExtension: req.body.contact.officeExtension,
                email:req.body.contact.email,
                phone: req.body.contact.phone
            },
            academic:{
                highestEducation: {
                    degree: req.body.academic.highestEducation.degree,
                    institute: req.body.academic.highestEducation.institute,
                    year: req.body.academic.highestEducation.year
                }
            }
        }
    },{new:true});

    if(!updatedStaff){
        res.status(404).send("Staff not found");
    }

    res.send(updatedStaff);
});

router.delete("/:id",[auth.auth,admin.admin],async(req,res) => {

    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if(!deletedStaff){
        return res.status(404).send("Staff not found");
    }

    res.send(deletedStaff);
});

exports.router = router;
