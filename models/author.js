
exports.up = (knex) => {
  return knex.schema.createTable('author', t => {
    t.increments('id').primary();
    t.string('name').unique();
    t.integer('numberOfTicket');
  }).catch((e) => {
    console.log('There was an error with the author table');
    console.log(e);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('author')
    .catch((e) => {
      console.log('there was an error deleting author table');
      console.log(e);
    });
};
