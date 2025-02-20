const winston = require("winston");
const fs = require("node:fs");

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({
            filename: "file-processing.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, message }) =>
                    `${timestamp} ${message}`
                ),
            ),
        }),
    ],
});

function countWords(filePath) {
    const startTime = Date.now();

    try {
        const data = fs.readFileSync(filePath, "utf8");

        const words = data.replace(/[^\w\s]/g, "").split(" ");
        logger.info(`Processed file: ${filePath}`);

        const endTime = Date.now();
        const processingTime = endTime - startTime;
        logger.info(`File processing time: ${processingTime}ms`);

        logger.info(`Words in the file: ${words.length}`);

        return words.length;
    } catch (err) {
        logger.error(`Error processing file: ${err.message}`);
        return 0;
    }
}

console.log(
    countWords("poem.txt"),
);
