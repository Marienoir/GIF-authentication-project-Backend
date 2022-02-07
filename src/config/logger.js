import { createLogger, format, transports } from 'winston';

const customFormat = format.combine(format.timestamp(), format.printf((info) => `${info.timestamp} - [${info.level.toUpperCase().padEnd(3)}] ${info.message}`));
const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log', level: 'info' }),
  ],
});

export default logger;
