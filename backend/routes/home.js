const express = require('express');
const router = express();

router.get("/",(req,res) => {
    res.send("Welcome to Employee Leave Management System");
});

exports.router = router;