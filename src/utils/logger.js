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
            `
            ${data},
             =====================================================>,Date: ${new Date()}`
            : `${data}
             ${rest.length ? JSON.stringify(rest) : ''}
             =========================================>,Date: ${new Date()}`;

        logger.log('info', message);
    }
}


export {logInfo}
