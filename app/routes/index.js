const express = require('express');
const handleExceptions = require('../middlewares/errorHandlers').handleExceptions;

/**
 * If the application is small, routers can be set in a single file, otherwise, * multiple file are suitable.
 * And use a main index file to export everything
 * Example
 * -------------------
 * --routes
 * ------tickets
 * ----------index
 * ----------displayAllTickets
 * ------otherAction
 * ----------index
 * --index
 * -------------------
 */

const main = express.Router();
const tickets = express.Router();
const error = express.Router();

main.get('/', handleExceptions(require('./default')));
main.get('/meagain', handleExceptions(require('./default')));

tickets.get('/', handleExceptions(require('./ticket').index));
tickets.get('/display', handleExceptions(require('./ticket').display));

error.get('/', handleExceptions(require('./error')));

module.exports = { main, tickets, error };
