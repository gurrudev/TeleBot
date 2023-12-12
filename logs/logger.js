const winston = require('winston')
const { MongoDB } = require("winston-mongodb");
const MONGO_URL = process.env.MONGO_URL;

//  To save the logs in database
const logger = winston.createLogger({
    level: "info",
    //format: winston.format.json(),
    transports: [
        new MongoDB({
            db: MONGO_URL,
            options: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
        }),
    ],
});

module.exports = logger