const express = require("express");
const router = express.Router();

const User = require("../../models/userSchema");
const errorHandler = require("../../middleware/errorHandler");
const userFunction = require("../../middleware/userFunction");

router.get("/", userFunction.userList);

module.exports = router;
