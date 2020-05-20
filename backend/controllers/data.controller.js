const _ = require('underscore');
const CalendarAppointment = require('../models/calendar.date.model');
const User = require('../models/user.model');

// TODO: Lol this function is just silly...
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

	console.log(req.user);

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

module.exports.updateCalendarDate = (req, res) => {
	let appointment_id = req.body.appointment_id;
	let updates = { user_id: req.body.user_id, busy: req.body.busy };

	// TODO: Assert that user_id exists in db
	console.log('Called updateCalendarDate');
	/*
	User.findById(updates.user_id, (err, model) => {
		if (err) {
			res.status(400).send({ message: err, success: false });
		}
			});
};
		*/
	CalendarAppointment.findByIdAndUpdate(
		appointment_id,
		updates,
		{ useFindAndModify: false },
		(err, model) => {
			if (err) {
				res.status(500).send({ message: err, success: false });
			} else {
				res.status(200).send({ message: 'Data updated', success: true });
			}
		}
	);
};

module.exports.getAllCalendarDates = (req, res) => {
	console.log('Called getAllCalendarDates');

	CalendarAppointment.find({}).then((appointments) => {
		if (appointments) {
			console.log('Sending all appointments');
			res.status(200).send(appointments);
		} else {
			console.log('No appointments available');
			res.status(400).send({ message: 'Not found' });
		}
	});
};
