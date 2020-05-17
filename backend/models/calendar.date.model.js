const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarAppointment = new Schema({
	time: {
		type: Date,
		required: true,
	},
	busy: {
		type: Boolean,
		required: true,
	},
	id_user: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model('CalendarAppointment', CalendarAppointment);
