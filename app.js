'use strict';
const express = require('express');
const catRoutes = require('./routes/catRoute');
const app = express();
const port = 3000;

app.use('/cat', catRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
