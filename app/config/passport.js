const { user } = require('../controller/account');

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const u = await user.getById(id);
    cb(null, u);
  });
};
