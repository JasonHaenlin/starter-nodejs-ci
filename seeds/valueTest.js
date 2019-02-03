
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('test').del()
    .then(() => {
      // Inserts seed entries
      return knex('test').insert([
        {
          title: 'title1', description: 'rowValue1',
          finished_by: '2/1/2019', priority: 'low', type: 'normal', status: 'assign'
        },
        {
          title: 'title2', description: 'rowValue2',
          finished_by: '2/1/2018', priority: 'medium', type: 'normal', status: 'assign'
        },
        {
          title: 'title3', description: 'rowValue3',
          finished_by: '12/10/2017', priority: 'low', type: 'issue', status: 'to_do'
        },
        {
          title: 'title4', description: 'rowValue4',
          finished_by: '12/9/2016', priority: 'medium', type: 'impediment', status: 'to_do'
        },
        {
          title: 'title5', description: 'rowValue5',
          finished_by: '10/5/2015', priority: 'critical', type: 'issue', status: 'to_do'
        }
      ]);
    });
};
