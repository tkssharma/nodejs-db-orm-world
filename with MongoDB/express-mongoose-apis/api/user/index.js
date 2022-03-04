const controller = require('./user.controller');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../auth/auth.service');
router.get('/', passport.authenticate('jwt', { session: false }), isLoggedIn, controller.show);
// get current user 
// login and register routes 
router.post('/register', controller.register);
router.post('/login', controller.login);


module.exports = router;