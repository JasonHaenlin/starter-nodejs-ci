const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: './log/error.log', level: 'error', maxsize: 2000 }),
    new transports.File({ filename: './log/combined.log', maxsize: 2000 })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    )
  }));
}

module.exports = {
  /* logging the errors */
  logTheError: (error) => {
    logger.log('error', error);
  },
  LogTheInfo: (info) => {
    logger.info('info', info);
  }
};
