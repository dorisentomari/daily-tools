const shelljs = require('shelljs');

// 抽取视频里的音频
function extractAudio(input, output) {
  return new Promise((resolve, reject) => {
    try {
      shelljs(`ffmpeg -i ${input} -q:a 0 -map a ${output}`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// 截取视频，从 start 开始，往后截取 duration
function cutVideoStartDuration(input, output, start, duration) {
  return new Promise((resolve, reject) => {
    try {
      shelljs(
        `ffmpeg -i ${input} -ss ${start} -t ${duration} -c copy ${output}`
      );
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// 截取视频，从 start 开始，到 end 结束
function cutVideoStartTo(input, output, start, end) {
  return new Promise((resolve, reject) => {
    try {
      shelljs(`ffmpeg -i ${input} -ss ${start} -to ${end} -c copy ${output}`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

// 转换视频格式
function convertVideo(input, output) {
  return new Promise((resolve, reject) => {
    try {
      shelljs(`ffmpeg -i ${input} -c copy ${output}`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  extractAudio,
  cutVideoStartDuration,
  cutVideoStartTo,
  convertVideo
};
