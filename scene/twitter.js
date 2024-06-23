const twitterUtils = require('../scripts/twitterUtils');


// 示例使用
const inputFilePath = path.resolve(utils.rootPath, 'output\\image\\longIamgeDemo.jpg');
const outputDir = path.resolve(utils.rootPath, 'output\\image')

console.log('inputImagePath', inputFilePath);
console.log('outputDir', outputDir);

twitterUtils.splitImage(inputFilePath, outputDir);