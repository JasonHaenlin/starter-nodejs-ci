
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('ticket').del()
    .then(() => {
      // Inserts seed entries
      return knex('ticket').insert([
        { title: 'rowValue1', author_id: 1 },
        { title: 'rowValue2', author_id: 1 },
        { title: 'rowValue3', author_id: 2 }
      ]);
    });
};
