const express = require('express');
const router = express.Router();
const controller = require('../controllers/data.controller');
const passport = require('passport');

// TODO: Get this to work...
router.get(
	'/name',
	passport.authenticate('jwt', { session: false }),
	controller.getName
);

module.exports = router;
