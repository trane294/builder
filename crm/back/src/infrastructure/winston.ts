import winston from 'winston';

const colorsLogger: winston.config.AbstractConfigSetColors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
};
winston.addColors(colorsLogger);

const logger = winston.createLogger({
    // level: 'info', // Set the minimum log level
    format: winston.format.combine(
        winston.format.colorize(),
        // winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    ],
});

export default logger;
