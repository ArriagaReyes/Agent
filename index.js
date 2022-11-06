require('./utils/init.util')();
const { PORT } = require('./utils/config.util');
const logger = require('./utils/logger.util');
const app = require('./server');

logger.info('Creating http server');
const server = require('http').createServer(app);

server.listen(PORT, () => {
    logger.info(`Running on http://localhost:${PORT}`);
});