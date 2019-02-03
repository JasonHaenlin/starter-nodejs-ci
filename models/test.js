
exports.up = (knex) => {
  return knex.schema.createTable('test', (t) => {
    t.increments('id').primary();
    t.string('title');
    t.text('description');
    t.date('finished_by');
    t.enum('priority', ['low', 'critical', 'medium']);
    t.enum('type', ['normal', 'impediment', 'issue']);
    t.enum('status', ['pending', 'assign', 'to_do', 'completed', 'blocked']);
    t.timestamps();
  }).catch((e) => {
    console.log('There was an error with the test table');
    console.log(e);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('test')
    .catch((e) => {
      console.log('there was an error deleting test table');
      console.log(e);
    });
};
