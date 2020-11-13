'use strict';
const express = require('express');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('./utils/pass');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
  key: sslkey,
  cert: sslcert
};
const app = express();
const port = 3000;
const httpsPort = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public_html'));
app.use(express.static('uploads'));
app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user', passport.authenticate('jwt', {session: false}), userRoute);
app.use('/thumbnails', express.static('thumbnails'));

https.createServer(options, app).listen(httpsPort, () => console.log(`App is listening https port ${httpsPort}`));
http.createServer((req, res) => {
  res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
  res.end();
}).listen(port, () => console.log(`App is listening port ${port} and redirect it to port ${httpsPort}`));
