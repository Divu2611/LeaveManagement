const express = require('express');
const router = express();

const {Faculty,isValidFaculty} = require('../models/faculties');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post("/",[auth.auth],async(req,res)=>{    
    const newFaculty = new Faculty({
        personal:{
            name: req.body.personal.name,
            dateOfBirth: req.body.personal.dateOfBirth,
            designation: req.body.personal.designation,
            department: req.body.personal.department
        },
        contact:{
            address:{
                office:req.body.contact.address.office,
                city:req.body.contact.address.city,
                state:req.body.contact.address.state,
                country: req.body.contact.address.country
            },
            email: req.body.contact.email,
            phone: req.body.contact.phone
        },
        academic:{
            highestEducation: {
                degree: req.body.academic.highestEducation.degree,
                institute: req.body.academic.highestEducation.institute,
                year: req.body.academic.highestEducation.year
            }
        },
        publications:{
            researchArea: req.body.publications.researchArea,
            publications: req.body.publications.publications
        }
    });

    const result = await newFaculty.save();

    res.send(result);
});

router.get("/",[auth.auth,admin.admin],async(req,res)=>{
    const faculties = await Faculty.find();
    res.send(faculties);
});

router.get("/:id",async(req,res) => {
    const faculty = await Faculty.findById(req.params.id);
    if(!faculty){
        return res.status(404).send("Faculty not found");
    }

    res.send(faculty);
})

router.put("/:id",[auth.auth,admin.admin],async(req,res) => {

    var {error} = isValidFaculty(req.body);
    if(error){
        return res.status(400).send(error.message);
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, {
        $set:{
            personal:{
                name: req.body.personal.name,
                dateOfBirth: req.body.personal.dateOfBirth,
                designation: req.body.personal.designation,
                department: req.body.personal.department
            },
            contact:{
                address:{
                    office:req.body.contact.address.office,
                    city:req.body.contact.address.city,
                    state:req.body.contact.address.state,
                    country: req.body.contact.address.country
                },
                email:req.body.contact.email,
                phone: req.body.contact.phone
            },
            academic:{
                highestEducation: {
                    degree: req.body.academic.highestEducation.degree,
                    institute: req.body.academic.highestEducation.institute,
                    year: req.body.academic.highestEducation.year
                }
            },
            publications:{
                researchArea: req.body.publications.researchArea,
                publications: req.body.publications.publications
            }
        }
    },{new:true});

    if(!updatedFaculty){
        return res.status(404).send("Faculty not found");
    }

    res.send(updatedFaculty);
});

router.delete("/:id",[auth.auth,admin.admin],async(req,res) => {

    const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
    if(!deletedFaculty){
        return res.status(404).send("Faculty not found");
    }

    res.send(deletedFaculty);
});

exports.router = router;
