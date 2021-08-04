var express = require("express");

var router = express.Router();

router.get("/", function(req,res){

    res.json("this is a json status");

});

module.exports = router;
