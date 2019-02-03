require('../../server');
const assert = require('assert');

const ticket = require('@controller/ticket');

describe('ticket controller to database', () => {
  it('should get the list of ticket from the database', async () => {
    const res = await ticket.getAllTickets();
    assert.equal(3, res.length);
  });
});
