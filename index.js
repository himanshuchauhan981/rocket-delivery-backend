const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();
dotenv.config();

const sqlLib = require('./db/connection');
const { routes } = require('./routes');

sqlLib.sequelize.sync();

app.use(bodyParser.json());
app.use('/', routes());

app.listen(process.env.PORT, (err) => {
	if (err) console.log('Server error', err);
	else console.log(`Running on port ${process.env.PORT}`);
});
