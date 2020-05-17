const express = require('express');
const router = express.Router();
const controller = require('../controllers/data.controller');
const passport = require('passport');

// TODO: Get this to work...
router.post(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	controller.getProfile
);

module.exports = router;
