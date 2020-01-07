const express = require('express');
const route = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const auth = require('./controller/auth');
const { handle404Error, handleDevErrors, handleClientErrors, logErrors } = require('./middlewares/error-handlers');
const { AccessDeniedError } = require('./utils/errors');
const { LogTheTransaction } = require('./config/logger');
const app = express();

const allowedOrigins = ['https://ps.otakedev.com', 'http://localhost:4200'];

app.disable('x-powered-by');

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new AccessDeniedError(`Origin: ${origin} is now allowed`));
    }
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sess = {
  secret: 'cute little cookie',
  resave: false,
  saveUninitialized: false,
  cookie: {}
};

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  sess.cookie.secure = true;
}

app.use(session(sess));

// Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// log everything that pass to the router
app.use((req, res, next) => {
  LogTheTransaction(req.session.passport ? req.session.passport.user : 'none',
    `${req.originalUrl} - ${req.method} - ${req.ip}`,
    'info');
  next();
});


// add all the routes
app.use('/status', route.main);
// school url
app.use('/school', route.school);
// universities url
app.use('/universities', route.universities);
// auth url
app.use('/auth', route.auth);
// queue url
app.use('/queue', route.queue);
// account url
app.use('/account', auth.ensureAuthenticated, route.account);

// catch 404 and forward to error handler
// triggered when a non-existent route attempts to be accessed
app.use(handle404Error);

// log the errors
app.use(logErrors);

// client error handler
app.use(handleClientErrors);

// dev error handler
app.use(handleDevErrors);

module.exports = app;
