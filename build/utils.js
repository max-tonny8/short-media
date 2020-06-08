const path = require("path");
const fs = require("fs");
const process = require("process");
const { execSync } = require("child_process");
const ora = require("ora");
const log = require("./log");

function checkDll() {
  return new Promise((resolve, reject) => {
    log.info(`检测是否已生成Dll动态链接库`);
    const filePath = path.resolve(__dirname, "../dll/framework.dll.js");
    if (!fs.existsSync(filePath)) {
      downloadDll()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
      return;
    }
    log.success("已存在Dll链接库");
    resolve();
  });
}

function execScript(command) {
  execSync(command, (error, stdout, stderr) => {
    if (error) {
      log.error(error);
      reject();
    } else {
      log.info(stdout);
      resolve();
    }
  });
}

function downloadDll() {
  return new Promise((resolve, reject) => {
    const spinner = ora(`开始安装Dll链接库...`);
    spinner.start();
    try {
      execScript(`npm run build:dll`);
      spinner.succeed("已安装成功Dll链接库，开启打包进程...");
      resolve();
    } catch (err) {
      spinner.fail();
      reject(err);
    }
  });
}

function getNpmParam() {
  const env = process.env.NODE_ENV;
  return env;
}

function isProduction() {
  return getNpmParam() === "production";
}
module.exports = {
  downloadDll,
  execScript,
  checkDll,
  getNpmParam,
  isProduction
};
