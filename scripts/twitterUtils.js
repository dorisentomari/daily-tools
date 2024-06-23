const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const utils = require('./utils');

// 有一张长图，假如有很长，现在把图片分割成多张，然后上传到 twitter
// 要求分割后的每一张图片的宽度不变，高度为 1000px
// 注意，在分割后一张图片的时候，要保留上一张图片的后 50 px，作为下一站图片的开始位置
// 请给出切割的 node.js 代码示例
async function _splitImage(
  inputImagePath,
  outputDir,
  segmentHeight = 1000,
  overlap = 50
) {
  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 获取输入图片的信息
  // 读取图片信息
  const image = sharp(inputImagePath);
  const { width, height } = await image.metadata();

  let startY = 0;
  let segmentIndex = 0;

  while (startY < height) {
    const segmentFileName = path.join(outputDir, `segment_${segmentIndex}.png`);

    // 计算当前分割区域的高度
    const endY = Math.min(startY + segmentHeight, height);
    const currentHeight = endY - startY;

    // 提取分割部分并保存
    await image
      .extract({ left: 0, top: startY, width: width, height: currentHeight })
      .toFile(segmentFileName);

    console.log(`Saved ${segmentFileName}`);

    // 更新下一个分割的起始位置
    startY = endY - overlap;
    segmentIndex++;
  }
}

async function splitImage(inputPath, outputDir, sliceHeight = 1000) {
  return new Promise((resolve, reject) => {
    return _splitImage(inputPath, outputDir, sliceHeight)
      .then(() => {
        console.log(`${utils.bgGreen(utils.textBlack('图片分割完毕'))}`);
        return resolve(true);
      })
      .catch((err) => {
        console.error('Error:', err);
        return reject(err);
      });
  });
}

// 有一个视频，假如有很长，现在把视频分割成多个小视频，每个小视频的时长为 140 秒
// 请使用 node.js 的 shelljs 包，调用 ffmpeg 命令，输出代码示例
// 要求在输出第二段视频的时候，保留上一段视频的最后 5 秒，作为下一段视频的开始
// 要求使用 node.js 的循环来实现

/**
 * 获取视频总时长
 * @param {string} inputFile - 输入视频文件路径
 * @returns {number} 视频总时长（秒）
 */
function getVideoDuration(inputFile) {
  const result = shell.exec(
    `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${inputFile}`,
    { silent: true }
  );
  return parseFloat(result.stdout);
}

/**
 * 分割视频
 * @param {string} inputFile - 输入视频文件路径
 * @param {string} outputDir - 输出目录
 * @param {number} segmentDuration - 每段视频的时长（秒）
 * @param {number} overlapDuration - 重叠时长（秒）
 */
function _splitVideo(inputFile, outputDir, segmentDuration, overlapDuration) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const duration = getVideoDuration(inputFile);
  let startTime = 0;
  let segmentIndex = 1;

  while (startTime < duration) {
    const outputFile = path.join(outputDir, `output_${segmentIndex}.mp4`);
    const actualDuration =
      startTime + segmentDuration > duration
        ? duration - startTime
        : segmentDuration;

    const ffmpegCommand = `ffmpeg -ss ${startTime} -i ${inputFile} -t ${actualDuration + overlapDuration} -c copy ${outputFile}`;
    shell.exec(ffmpegCommand);

    startTime += segmentDuration - overlapDuration;
    segmentIndex += 1;
  }
}

async function splitVideo(
  inputFile,
  outputDir,
  segmentDuration,
  overlapDuration
) {
  return new Promise((resolve, reject) => {
    try {
      _splitVideo(inputFile, outputDir, segmentDuration, overlapDuration);
      return resolve(true);
    } catch (err) {
      console.error('Error:', err);
      return reject(err);
    }
  });
}

module.exports = {
  splitImage,
  splitVideo
};
