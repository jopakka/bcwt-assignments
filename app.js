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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public_html'));
app.use(express.static('uploads'));
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/thumbnails', express.static('thumbnails'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
