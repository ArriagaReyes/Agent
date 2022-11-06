const { DB_URI } = require('./config.util');
const logger = require('./logger.util');
const mongoose = require('mongoose');

module.exports = () => {
    logger.info('Connecting to database');

    mongoose.connect(DB_URI)
    .then(() => {
        logger.info(`Connected to database: ${DB_URI}`);
    })
    .catch((error) => {
        logger.error('Connection error:', error);
    });
};