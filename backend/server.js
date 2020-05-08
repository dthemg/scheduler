const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const logger = require('morgan');
const { BASE_URL, PORT, DB_ADDRESS } = require('./config/configs');
const authRoutes = require('./routes/authentication.routes');

const app = express();

// Register middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

// Setup passport for authentication
app.use(passport.initialize());
require('./authentication/passport')(passport);
// TODO: Set up passport
// TODO: Keep reading on passport: 
// https://itnext.io/implementing-json-web-tokens-passport-js-in-a-javascript-application-with-react-b86b1f313436

// Mongoose connection
mongoose.connect(DB_ADDRESS, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use("/auth", authRoutes);

// Set up routes
// TODO Add first routes...

// Express listens on port
app.listen(PORT, () => console.log(`Server running on ${BASE_URL}`));
