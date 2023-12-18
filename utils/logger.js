const bunyan = require("bunyan");

module.exports = function logger(loggerName, skipContext) {
  const logLevelObj = {
    testing: "fatal",
    production: "info",
  };

  // type LogLevelString = "trace" | "debug" | "info" | "warn" | "error" | "fatal");
  let bunyanConfig = {
    name: loggerName,
    level: "trace",
  };

  let logger = bunyan.createLogger(bunyanConfig);

  let constructLogObj = (level) => {
    return (...args) => {
      try {
        if (!skipContext) {
          logger[level](...args);
        } else {
          //no-args
        }
      } catch (e) {
        logger.error("error in apiHash");
        logger.error(e);
        logger[level](...args);
      }
    };
  };

  let logObj = {
    info: constructLogObj("info"),
    trace: constructLogObj("trace"),
    debug: constructLogObj("debug"),
    warn: constructLogObj("warn"),
    error: constructLogObj("error"),
    fatal: constructLogObj("fatal"),
  };

  return logObj;
}
