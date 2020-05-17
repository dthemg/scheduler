// TODO: Get this to work...
module.exports.getProfile = (req, res) => {
	console.log('called getProfile');
	res.status(200).send({ message: 'called getProfile' });
};
