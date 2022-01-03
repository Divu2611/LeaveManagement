const express = require('express');
const router = express();

const {LeaveRecords,isValidRecord} = require('../models/leaveRecords');
const {Employee} = require('../models/employees');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const emp = require("../middleware/emp");

router.post("/",[emp.emp],async (req,res) => {
    const employee = await Employee.findById(req.body.employeeId);
    if(!employee){
        return res.status(404).send("Employee not found...");
    }

    const newRecord = new LeaveRecords({
        employee: {
            type: employee.type,
            type_id: employee.type_id,
            name: employee.name,
            email: employee.email,
            phone: employee.phone
        },

        leave: req.body.leave,

        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        status: req.body.status
    });

    try{
        const result = await newRecord.save();
        return res.send(result);
    }catch(exception){
        for(error in exception.errors){
            res.send(exception.errors[error].message);
        }
    }
});

router.get("/",async (req,res) => {
    const records = await LeaveRecords.find();
    res.send(records);
});

// router.get("/:id",[authFac.authFac],async (req,res) => {
//     const record = await LeaveRecords.findById(req.params.id);
//     if(!record){
//         res.status(404).send("Record not found...");
//     }

//     res.send(record);
// });

router.put("/:id",[auth.auth,admin.admin],async(req,res) => {
    const updatedRecord = await LeaveRecords.findByIdAndUpdate(req.params.id,{
        $set:{
            status: req.body.status
        }
    },{new:true});

    if(!updatedRecord){
        return res.status(404).send("Record not found...");
    }

    res.send(updatedRecord);
});

router.delete("/:id",[auth.auth,admin.admin],async (req,res) => {
    const deletedRecord = await LeaveRecords.findByIdAndDelete(req.params.id);
    if(!deletedRecord){
        return res.status(404).send("Record not found...");
    }

    res.send(deletedRecord);
});

exports.router = router;