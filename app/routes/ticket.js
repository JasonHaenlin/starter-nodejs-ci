const resHandler = require('@utils/responseHandler');
const ticket = require('@controller/ticket');

// using the database
exports.index = async (req, res) => {
  const tickets = await ticket.getAllTickets();
  res.json(tickets);
};

// mock data
exports.display = async (req, res) => {
  // basic set of data
  const postsData = [
    { id: 1, descritption: 'here is the first description' },
    { id: 2, descritption: 'here is the second description' }
  ];
  // using the response handler
  resHandler.yahResponse(res, postsData, req);
};
