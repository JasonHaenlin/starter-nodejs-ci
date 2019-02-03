
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('author').del()
    .then(() => {
      // Inserts seed entries
      return knex('author').insert([
        { id: 1, name: 'Pichu', numberOfTicket: 2 },
        { id: 2, name: 'Pikachu', numberOfTicket: 1 },
        { id: 3, name: 'Raichu', numberOfTicket: 0 }
      ]);
    });
};
