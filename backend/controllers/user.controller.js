const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports.login = (req, res) => {
	console.log('Login called');

	// TODO: Default message with empty slots? Might be nice...

	var body = req.body;
	if (!body) {
		res.status(400).send({ message: 'Request body empty' });
	}

	console.log(body.email);

	// Find user by email
	User.findOne({ email: body.email }).then((user) => {
		if (!user) {
			console.log('User not found');
			res.status(400).send({ message: 'User not registered' });
		} else {
			// Check password validity
			bcrypt.compare(body.password, user.password).then((isMatch) => {
				console.log(`DB and provided password match: ${isMatch}`);
				if (isMatch) {
					const jwtPayload = {
						id: user.id,
						name: user.name,
					};
					jwt.sign(
						jwtPayload,
						secrets.secretOrKey,
						{ expiresIn: 3600 },
						(err, token) => {
							if (err) {
								res
									.status(500)
									.send({ message: 'Server error during signing' });
							} else {
								res
									.status(200)
									.send({ success: true, token: 'Bearer ' + token });
							}
						}
					);
				} else {
					res.status(400).send({ message: 'Invalid password' });
				}
			});
		}
	});
};

module.exports.register = (req, res) => {
	// TODO: Validate input
	console.log('Register called');

	var body = req.body;
	if (!body) {
		res.status(400).send({ message: 'Request body empty' });
	}

	// Check if email is in use
	User.findOne({ email: body.email }).then((user) => {
		if (user) {
			console.log('Email already in use');
			res.status(400).send({ message: 'Email already in use' });
		} else {
			// Register new user
			console.log('Registering new user');
			const newUser = new User({
				name: body.name,
				email: body.email,
				password: body.password,
			});

			// Hash password, then store in DB
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then((newUser) => res.json(newUser)) // What's the point of this?
						.catch((err) => console.log(err));
				});
			});
		}
	});
};
