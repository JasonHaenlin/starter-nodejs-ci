const test = require('../models/test');
const author = require('../models/author');
const ticket = require('../models/ticket');

/**
 * All the table are created here
 * be sure to create then in the right order
 * when constraints are present
 */

exports.up = (knex) => {
  return test.up(knex)
    .then(() => author.up(knex))
    .then(() => ticket.up(knex))
    .catch((err) => console.log(err));
};

exports.down = (knex) => {
  return test.down(knex)
    .then(() => author.down(knex))
    .then(() => ticket.down(knex))
    .catch((err) => console.log(err));
};
