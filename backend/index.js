const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');

const routes = require('./startup/routes');
const configure = require('./startup/configuration');

configure.configure();

const http = express();
http.use(cors());

const portNumber = process.env.PORT || config.get("port");

routes.routes(http);
mongoose.connect(config.get("db"));

http.listen(portNumber,()=>{
    console.log(`Listening on Port: ${portNumber}`);
});