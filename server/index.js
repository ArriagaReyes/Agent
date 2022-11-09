const logger = require('../utils/logger.util');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const DocumentRouter = require('./routes/Document.route');
const RepositoryRouter = require('./routes/Repository.route');

const app = express();

logger.info('Initilizing middleware');
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

logger.info('setting up routes');
app.use('/api/document', DocumentRouter);
app.use('/api/repository', RepositoryRouter);

logger.info('Exporting express app');
module.exports = app;