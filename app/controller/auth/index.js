const crypt = require('../../utils/crypt');
const { UnauthenticatedUserError, ValidationError } = require('../../utils/errors');

module.exports = {

  ensureAuthenticated(req, res, next = () => { }) {
    if (!req.isAuthenticated()) {
      throw new UnauthenticatedUserError('No privilege to access this resource');
    }
    next();
  },

  checkPassword(storedUser, password) {
    if (!storedUser || !password) {
      throw new ValidationError('Invalid username or password');
    }
    return crypt.decipher(storedUser.hash, password);
  }
};
