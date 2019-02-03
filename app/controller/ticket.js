// simple example using objection and knex
const Ticket = require('@orm').Ticket;


const getAllTickets = () => {
  // select * from ticket = Ticket.query();
  return Ticket.query()
    .alias('t')
    .select('t.id', 't.title', 't.description', 'author.name')
    .joinRelation('author');
  // .where({ 'a.id': 1 }); //the same
  // .where('a.id', 1);
};

module.exports = { getAllTickets };
