const chalk = require('chalk');
const log = console.log;

export const ascii = () => {
  log("")
  log(chalk.green(" _ __ ___   ___  _ __   ___  _ __ ___ _ __   ___   "))
  log(chalk.green("| '_ ` _ \\ / _ \\| '_ \\ / _ \\| '__/ _ \\ '_ \\ / _ \\  "))
  log(chalk.green("| | | | | | (_) | | | | (_) | | |  __/ |_) | (_) | "))
  log(chalk.green("|_| |_| |_|\\___/|_| |_|\\___/|_|  \\___| .__/ \\___/  "))
  log(chalk.green("GENERATOR                            |_|           "))
  log("")
}
