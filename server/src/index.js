const shortid = require('shortid')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Utils = require('./utils');
const ohmsRoutes = require('./routes')
app.use(bodyParser.json())


app.use('/ohms', ohmsRoutes);
app.listen(3000, () => console.log('listening on port 3000'));
