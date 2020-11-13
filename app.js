'use strict';
const express = require('express');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass');

const app = express();
const port = 3000;
const httpsPort = 8000;

app.enable('trust proxy');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('./production')(app, process.env.PORT);
} else {
  require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}
app.get('/', (req, res) => {
  res.send('Hello Secure World!');
});

// Routes
app.use(express.static('public_html'));
app.use(express.static('uploads'));
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/thumbnails', express.static('thumbnails'));
