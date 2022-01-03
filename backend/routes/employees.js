const express = require('express');
const router = express();

const {Employee,isValidEmployee} = require("../models/employees");
const {Faculty} = require("../models/faculties");
const {Scholar} = require("../models/scholars");
const {Staff} = require('../models/staffs');

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/",[auth.auth],async (req,res) => {

    const type = req.body.type;
    const emp = type === 'faculty' ? await Faculty.findOne({'contact.email': req.body.email}) : 
                type === 'scholar' ? await Scholar.findOne({email: req.body.email}) : await Staff.findOne({'contact.email' : req.body.email});
    if(!emp){
        return res.status(404).send("Employee Type not found...");
    }

    const newEmployee = new Employee({
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type_id: emp._id,
        leaves: {
            casualLeave: 10,
            unPaidLeave: 30,
            privilegedLeave: 15
        }
    });

    const result = await newEmployee.save();

    res
        .header("x-empToken",newEmployee.generateEmpToken())
        .header("access-control-expose-headers","x-empToken")
        .send(result);
});

router.get("/",[auth.auth,admin.admin],async(req,res) => {
    const employees = await Employee.find();
    res.send(employees);
});

router.get("/:id",async(req,res) => {
    const employee = await Employee.findOne({type_id: req.params.id});
    if(!employee){
        return res.status(404).send("Employee not found...");
    }

    res.send(employee);
});

router.put("/:id",[auth.auth],async(req,res) => {
    const {error} = isValidEmployee(req.body);
    if(error){
        return res.status(400).send(error);
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
        $set:{
            type: req.body.type,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            type_id: req.body.type_id,
            leaves: {
                casualLeave: req.body.leaves.casualLeave,
                unPaidLeave: req.body.leaves.unPaidLeave,
                privilegedLeave: req.body.leaves.privilegedLeave
            }
        }
    },{new:true});

    if(!updatedEmployee){
        return res.status(404).send("Employee not found...");
    }

    res.send(updatedEmployee);
});

router.delete("/:id",[auth.auth,admin.admin],async(req,res) => {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if(!deletedEmployee){
        return res.status(404).send("Employee not found...");
    }

    res.send(deletedEmployee);
});

exports.router = router

