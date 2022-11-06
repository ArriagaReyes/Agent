const logger = require('./logger.util');
const { PORT, DB_URI } = require('./config.util');

module.exports = () => {
    logger.info('Initilizing env variables and database');

    if(!PORT) throw new Error('Port number missing');
    if(!DB_URI) throw new Error('Database URI missing');

    require('./database.util')();
};