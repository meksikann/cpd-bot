const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'rasa-bot.log' })
    ]
});

function logInfo(data, ...rest) {
    if(process.env.LOGS == 1) {
        const message = typeof data == 'object' ?
            `DATE: ${new Date()}. LOG: ${data}
             ----------------------------------------------------------------------->`
            : `DATE: ${new Date()}. LOG: ${data}
             ${rest.length ? JSON.stringify(rest) : ''}
             ----------------------------------------------------------------------->`;

        logger.log({
            level: 'info',
            message: message
        });
    }
}

function logError(err) {
    logger.log('error', err);
}


export {logInfo, logError }
