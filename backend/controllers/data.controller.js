module.exports.getProfile = (req, res) => {
	console.log('called getProfile');
	res.status(200).send({
		name: req.user.name,
		email: req.user.email,
	});
};
