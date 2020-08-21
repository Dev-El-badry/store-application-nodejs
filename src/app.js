const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());

//API
app.get('/', (req, res) => {
    res.json({
        message: 'Store Inventory API'
    });
});

app.use('/api/v1', api);

//Handler Errors
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;