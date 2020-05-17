const express = require('express');
const router = express.Router();
const controller = require('../controllers/data.controller');
const passport = require('passport');

router.post(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	controller.getProfile
);
// TODO: Admin authentication, send list of new dates
router.post('/addCalendarDate', controller.addCalendarDate);

module.exports = router;
