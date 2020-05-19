const _ = require('underscore');
const CalendarAppointment = require('../models/calendar.date.model');

module.exports.getProfile = (req, res) => {
	console.log('called getProfile');
	// Uuuuh I think we are sending back what we received...
	res.status(200).send({
		name: req.user.name,
		email: req.user.email,
	});
};

// This has to be admin authenticated
module.exports.addCalendarDate = (req, res) => {
	console.log('Called addCalendarDate');

	if (_.isEmpty(req.body)) {
		res.status(400).send({ message: 'Add call has empty body' });
		return;
	}

	CalendarAppointment.findOne({
		time: req.body.time,
	}).then((appointment) => {
		if (appointment) {
			res.status(400).send({ message: 'Time already in db' });
		} else {
			console.log('Adding new calendar appointment ');
			const newAppointment = new CalendarAppointment({
				time: req.body.time,
				busy: false,
			});
			newAppointment
				.save()
				.then(() => res.status(200).send({ message: 'Appointment was added' }))
				.catch((err) => res.status(500).send(`Error when saving: ${err}`));
			return;
		}
	});
};

module.exports.getAllCalendarDates = (req, res) => {
	console.log('Called getAllCalendarDates');
	CalendarAppointment.find({}).then((appointments) => {
		console.log(appointments);
		res.status(200).send(appointments);
	});
};
