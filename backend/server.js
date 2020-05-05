const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const { BASE_URL, PORT, DB_ADDRESS } = require('./config/configs');

const app = express();

// Register middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
// TODO: Set up passport

// Mongoose connection
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set up routes
// TODO Add first routes...

// Express listens on port
app.listen(PORT, () => console.log(`Server running on ${BASE_URL}`));
