const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

/**
 * Logger: Handles logging operations and message counters.
 */
class Logger {
    constructor(logDirectory = 'logs') {
        this.logDirectory = logDirectory;
        this.NumberOfSentMessages = 0; // Counter for sent messages
        this.NumberOfReceivedMessages = 0; // Counter for received messages
        this.now = moment(); // Automatically uses the default time zone
        console.log(`⌚ LOGGER Default Time Zone ${moment.tz.guess()} ${this.now.format()}⌚` );        
        this.initialize();
    }

    /**
     * Initialize the logger by creating the log directory if it doesn't exist.
     */
    initialize() {
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
    }

    /**
     * Log a message to a file.
     * @param {string} message - The message to log.
     * @param {string} level - Log level (INFO, ERROR, DEBUG).
     */
    
    log(message, level = 'INFO') {
    const logFile = path.join(this.logDirectory, `${this.now.format()}.log`);
    
    // Adjust the message based on the log level
    let adjustedMessage = message;
    if (level === 'INFO') {
        adjustedMessage = message.length > 200 ? message.substring(0, 200) + '...' : message;
    }

    const logEntry = `${this.now.format()} [${level}] ${adjustedMessage}\n`;

    fs.appendFileSync(logFile, logEntry, 'utf8');
    console.log(logEntry.trim());
}


    /**
     * Increment the counter for received messages.
     */
    incrementReceivedMessages() {
        this.NumberOfReceivedMessages += 1;
    }

    /**
     * Increment the counter for sent messages.
     */
    incrementSentMessages() {
        this.NumberOfSentMessages += 1;
    }
}

module.exports = Logger;
