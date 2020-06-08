const logSymbols = require("log-symbols");
const chalk = require("chalk");
const log = console.log;
module.exports = {
  warn: (...msg) => {
    log(logSymbols.warning, chalk.yellow(...msg));
  },
  success: (...msg) => {
    log(logSymbols.success, chalk.green(...msg));
  },
  error: (...msg) => {
    log(logSymbols.error, chalk.red(...msg));
  },
  info: (...msg) => {
    log(logSymbols.info, chalk.white(...msg));
  }
};
