const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { ValidationError } = require('../utils/errors');
const { promisify } = require('util');

const saltRounds = 10;
const nbOfBytes = 16;
const randomBytesAsync = promisify(crypto.randomBytes);

module.exports = {
  async cipher(password) {
    let hash = '';
    try {
      hash = await bcrypt.hash(password, saltRounds);
    } catch (err) {
      throw new Error(`Error hashing the password : ${err.message}`);
    }
    return hash;
  },

  async decipher(stored, incoming) {
    const match = await bcrypt.compare(incoming, stored);
    if (!match) {
      throw new ValidationError('Failed to login');
    }
    return true;
  },

  async randomBytesAsync() {
    const buf = await randomBytesAsync(nbOfBytes);
    return buf.toString('hex');
  }

};
