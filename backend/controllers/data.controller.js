const _ = require('underscore');
const CalendarAppointment = require('../models/calendar.date.model');
const User = require('../models/user.model');
const secrets = require('../config/secrets');

module.exports.getProfile = (req, res) => {
	console.log('called getProfile');

	User.findOne({ email: req.user.email }, (err, model) => {
		if (err) {
			res.status(500).send({ message: err });
		}
		if (model) {
			res.status(200).send({
				id: model._id,
				name: model.name,
				email: model.email,
				created: model.date,
			});
		} else {
			res.status(400).send({ message: 'Did not find user in db' });
		}
	});
};

module.exports.addCalendarDate = (req, res) => {
	console.log('Called addCalendarDate');

	if (_.isEmpty(req.body)) {
		res.status(400).send({ message: 'Add call has empty body' });
		return;
	}

	if (!secrets.adminUsers.includes(req.user.email)) {
		res.status(401).send({ message: 'Only admins have access' });
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

module.exports.updateCalendarDate = (req, res) => {
	console.log('Called updateCalendarDate');

	let appointment_id = req.body.appointment_id;
	let updates = { user_id: req.body.user_id, busy: req.body.busy };

	User.findById(updates.user_id, (err) => {
		if (err) {
			res.status(400).send({ message: 'User not in db', success: false });
		} else {
			CalendarAppointment.findById(appointment_id, (err, appointment) => {
				if (err) {
					res
						.status(500)
						.send({ message: 'Server error when booking', success: false });
				} else if (appointment.user_id !== updates.user_id) {
					res.status(401).send({ message: 'Unauthorized', success: false });
				} else {
					appointment.user_id = updates.user_id;
					appointment.busy = updates.busy;
					res
						.status(200)
						.send({ message: 'Updated successfully', success: true });
				}
			});
		}
	});
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
