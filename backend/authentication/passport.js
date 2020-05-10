const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const secrets = require('../config/secrets');

var opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secrets.secretOrKey,
};

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then((user) => {
					if (user) {
						console.log('Found user', { ...user });
						return done(null, user);
					} else {
						console.log('Did not find user');
						return done(null, false);
					}
				})
				.catch((err) => console.log(err));
		})
	);
};
