const resHandler = require('../../utils/response-handler');
const auth = require('../../controller/auth');
const { user, token } = require('../../controller/account');
const { ValidationError } = require('../../utils/errors');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const u = await user.getUser(username);
  // check if the passwords match
  await auth.checkPassword(u, password);
  // if no error, login
  req.login(u, (err) => {
    if (err) {
      throw new ValidationError('Failed to login', err);
    }
  });
  resHandler.yahResponse(res, { auth: true });
};

exports.logoutUser = async (req, res) => {
  req.logout();
  resHandler.yahResponse(res, { auth: true });
};

exports.checkAuthentication = async (req, res) => {
  auth.ensureAuthenticated(req, res);
  resHandler.yahResponse(res, { auth: true });
};

exports.checkTokenValidy = async (req, res) => {
  const status = await token.checkTokenValidy(req.body.token);
  resHandler.yahResponse(res, { token: status ? true : false });
};
