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
	user_id: {
		type: String,
		required: false,
		default: '',
	},
});

module.exports = mongoose.model('CalendarAppointment', CalendarAppointment);
