const logger = require('./logger.util');

logger.info('Configuring env variables');
require('dotenv').config();
const PORT = process.env.PORT || 6969;
let DB_URI = process.env.DB_URI;

module.exports = { PORT, DB_URI };