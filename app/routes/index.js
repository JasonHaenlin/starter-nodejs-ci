const auth = require('./auth');
const express = require('express');

const main = express.Router();

main.get('/', (req, res) => res.status(200).json('ok'));

module.exports = {
  auth
};
