const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;
const fs = require('fs');
require('dotenv').config();

const logDirectory = process.env.LOG_DIRECTORY;
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp, stack }) => {
      return stack
        ? `${timestamp} [${level}]: ${message}\n${stack}`
        : `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: `${logDirectory}/error.log`,
      level: 'error',
    }),
    new transports.File({ filename: `${logDirectory}/combined.log` }),
  ],
});

module.exports = logger;
