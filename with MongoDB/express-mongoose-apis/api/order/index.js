const express = require("express");
const controller = require("./order.controller");
const auth = require("../auth/auth.service");
const passport = require('passport');
const router = express.Router();
const { isLoggedIn } = require('../auth/auth.service');

router.get("/", passport.authenticate('jwt', { session: false }), controller.index);
router.get("/:id", passport.authenticate('jwt', { session: false }), isLoggedIn, controller.show);
router.post("/", passport.authenticate('jwt', { session: false }), isLoggedIn, controller.create);
router.put("/:id", passport.authenticate('jwt', { session: false }), isLoggedIn, controller.update);
module.exports = router;
