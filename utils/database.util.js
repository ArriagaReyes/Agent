const { DB_URI } = require('./config.util');
const logger = require('./logger.util');
const mongoose = require('mongoose');

const connect = () => {
    logger.info('Connecting to database');

    mongoose.connect(DB_URI)
    .then(() => {
        logger.info(`Connected to database: ${DB_URI}`);
    })
    .catch((error) => {
        logger.error('Connection error:', error);
    });

    return mongoose.connection;
};

const disconnect = () => {
    return mongoose.disconnect();
}

module.exports = { connect, disconnect };