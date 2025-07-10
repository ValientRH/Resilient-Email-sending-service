// Logger.js
class Logger {
  static log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${level.toUpperCase()}] ${timestamp} - ${message}`);
  }

  static info(message) {
    this.log("info", message);
  }

  static error(message) {
    this.log("error", message);
  }

  static warn(message) {
    this.log("warn", message);
  }
}

module.exports = Logger;
