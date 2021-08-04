var express = require("express");

var router = express.Router();

//TODO:erro info

router.use("/users", require("./users"));


module.exports = router ; 