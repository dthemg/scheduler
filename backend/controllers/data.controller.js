const _ = require('underscore');

module.exports.getProfile = (req, res) => {
	console.log('called getProfile');
	res.status(200).send({
		name: req.user.name,
		email: req.user.email,
	});
};

module.exports.addCalendarDate = (req, res) => {
	console.log('Called addCalendarDate');

	if (_.isEmpty(req.body)) {
		res.status(400).send({ message: 'Add call has empty body' });
		return;
	}

	res.status(200).send({ message: 'Called add function' });
};
