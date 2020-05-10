const passport = require('passport');

// TODO: Get this to work...
module.exports.getName = (req, res) => {
	console.log('called getName');
	res.status(200).send({ message: 'called getName' });
};
