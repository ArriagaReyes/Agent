const logger = require('../utils/logger.util');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

logger.info('Initilizing middleware');
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    logger.info('accessing / endpoint');

    res.send('This is the server').status(201).end();
});

logger.info('Exporting express app');
module.exports = app;