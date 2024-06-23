const moment = require('moment');
const path = require('path');
const chalk = require('chalk');

// 格式化日期
function formatDate(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format);
}

// 格式化时间
function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(date).format(format);
}

// 睡眠 n 毫秒
function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function bgGreen(text) {
  return chalk.bgGreen.black(text);
}

function bgRed(text) {
  return chalk.bgRed.black(text);
}

function textGreen(text) {
  return chalk.green(text);
}

function textRed(text) {
  return chalk.red(text);
}

function textWhite(text) {
  return chalk.white(text);
}

function textBlack(text) {
  return chalk.black(text);
}

module.exports = {
  rootPath: path.resolve(__dirname, '..'),

  formatDate,
  formatTime,

  sleep,

  bgGreen,
  bgRed,
  textGreen,
  textRed,
  textWhite,
  textBlack
};
