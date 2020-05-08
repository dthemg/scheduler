const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
	console.log("Login called")
	res.status(200).send("Login was called");
}

module.exports.register = (req, res) => {
	// TODO: Validate input
	console.log("Register called");
	var body = req.body;
	if (!body) {
		res.status(400).send({ message: "Request body empty" });
	}

	User.findOne({ "email": body.email }).then(user => {
		if (user) {
			console.log("Email already in use");
			res.status(400).send({ message: "Email already in use" });
		} else {
			console.log("Registering new user")
			const newUser = new User({
				name: body.name,
				email: body.email,
				password: body.password
			});
			
			// Hash password, then store in DB
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash
					newUser
						.save()
						.then((newUser) => res.json(newUser))
						.catch((err) => console.log(err));
				});
			});
		};
	}); 
};
