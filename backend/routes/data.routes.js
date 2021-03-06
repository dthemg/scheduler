const express = require('express');
const router = express.Router();
const controller = require('../controllers/data.controller');
const passport = require('passport');

router.post(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	controller.getProfile
);

router.post(
	'/addCalendarDate',
	passport.authenticate('jwt', { session: false }),
	controller.addCalendarDate
);

router.get(
	'/getAllCalendarDates',
	passport.authenticate('jwt', { session: false }),
	controller.getAllCalendarDates
);

router.post(
	'/updateCalendarDate',
	passport.authenticate('jwt', { session: false }),
	controller.updateCalendarDate
);

module.exports = router;
