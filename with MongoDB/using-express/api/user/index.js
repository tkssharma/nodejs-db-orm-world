const controller = require("./user.controller");

const express = require("express");
const auth = require("../auth/auth.service");
const router = express.Router();

// get user
router.get("/", auth.hasRole("user"), controller.show);
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", controller.registerUser);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", controller.loginUser);

module.exports = router;
