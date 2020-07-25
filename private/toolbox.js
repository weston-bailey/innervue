const chalk = require('chalk');

//export utility funcitons
module.exports = {
  //visible errors
  logError: function(){
    console.log(`${chalk.black.bgRed.bold(`ლ(ಠ益ಠლ)`)}🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥${chalk.red.bold(`BEGIN ERROR LOG`)}🔥🔥🔥🔥🔥🔥🔥${chalk.black.bgRed.bold(`‎(╯ ಥ益ಥ )╯ ┻━┻`)}`);
    for (let i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
    console.log(`${chalk.black.bgRed.bold(`\･┻━┻︵╰(ಥДಥ╰)`)}🔥🔥🔥🔥🔥🔥🔥🔥🔥${chalk.red.bold(`END ERROR LOG`)}🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥${chalk.black.bgRed.bold(`(ノ\`Д ́)ノ`)}`);
  },
  //visible log
  log: function(){
    console.log((`${chalk.black.bgGreen.bold(`└[∵┌]`)}👾👾👾👾👾👾👾👾👾👾👾${chalk.green.bold(`BEGIN └[ ∵ ]┘ LOG`)}👾👾👾👾👾👾👾👾👾👾👾${chalk.black.bgGreen.bold(`[┐∵]┘`)}`));
    for (let i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
    console.log((`${chalk.black.bgGreen.bold(`└[∵┌]`)}👾👾👾👾👾👾👾👾👾👾👾${chalk.green.bold(`END └[ ∵ ]┘ LOG`)}👾👾👾👾👾👾👾👾👾👾👾👾${chalk.black.bgGreen.bold(`[┐∵]┘`)}`));
  }
}