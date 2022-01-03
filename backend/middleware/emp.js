const jwt = require('jsonwebtoken');
const config = require('config');

function emp(req,res,next){

    if(!config.get('authReq')){
        return next();
    }

    const empToken = req.header("x-empToken");
    if(!empToken){
        return res.status(401).send("Access Denied... No Token Authorized");
    }

    try{
        const decodedPayload = jwt.verify(empToken,config.get('jwtPrivateKey'));
        req.emp = decodedPayload;
        next();
    }catch(exception){
        return res.status(400).send("Access Denied... Invalid Token");
    }
}

exports.emp = emp;