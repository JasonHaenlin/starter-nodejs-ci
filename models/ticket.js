
exports.up = (knex) => {
  return knex.schema.createTable('ticket', (t) => {
    t.increments('id').primary();
    t.string('title').unique();
    t.string('description', 100);
    t.integer('author_id');
    t.foreign('author_id').references('id').inTable('author');
  }).catch((e) => {
    console.log('There was an error with the Ticket table');
    console.log(e);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('ticket')
    .catch((e) => {
      console.log('there was an error deleting ticket table');
      console.log(e);
    });
};
