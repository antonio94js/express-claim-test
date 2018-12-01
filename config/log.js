import winston from 'winston';

// Set a global winston object to log errors and info in a better way
global.winston = new winston.Logger({
  level: 'silly',
  exitOnError: false,
  transports: [
    new(winston.transports.Console)({
      prettyPrint: true,
      colorize: true,
      json: false,
    }),
  ],
});