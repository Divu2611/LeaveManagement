const express = require('express');

const home = require('../routes/home');
const auth = require('../routes/auth');
const user = require('../routes/users');
const employee = require('../routes/employees');
const faculty = require('../routes/faculties');
const scholar = require('../routes/scholars');
const staff = require('../routes/staffs');
const leave = require('../routes/leaves');
const record = require('../routes/leaveRecords');

function routes(http){
    http.use(express.json());

    http.use("/",home.router);
    http.use("/api/auth",auth.router);
    http.use("/api/employee",employee.router);
    http.use("/api/scholar",scholar.router);
    http.use("/api/faculty",faculty.router);
    http.use("/api/staff",staff.router);
    http.use("/api/users",user.router);
    http.use("/api/leaves",leave.router);
    http.use("/api/record",record.router);
}

exports.routes = routes;