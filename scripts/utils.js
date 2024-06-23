const moment = require('moment');

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

module.exports = {
  formatDate,
  formatTime,
  sleep
};
