var express = require("express");

var router = express.Router();

//TODO:erro info

router.use(function(req,res,next){

    res.locals.currentUser = req.user;

    next()

});

router.use("/", require("./home"));


module.exports = router ; 
