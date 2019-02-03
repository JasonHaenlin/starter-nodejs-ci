const express = require('express');
const route = require('./routes');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { handle404Error, handleDevErrors } = require('./middlewares/errorHandlers');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// add all the routes
// main url
app.use('/', route.main);
// ticket url
app.use('/tickets', route.tickets);
// error url (for testing only)
app.use('/error', route.error);

// catch 404 and forward to error handler
app.use(handle404Error);
// error handler
app.use(handleDevErrors);

module.exports = app;
