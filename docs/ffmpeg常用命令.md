# ffmpeg

## 基本命令

```shell
ffmpeg -h   // 帮助
ffmpeg -version // 版本信息
ffmepg -devices // 查看可用设备
ffmpeg -i input.mp4 // 查看视频信息
```

## 主要参数

- **-i** 
  - 设定输入流。指定输入文件或流，例如视频文件或音频文件。
  - 示例：`ffmpeg -i input.mp4`

- **-f**
  - 设定输出格式。指定输出文件的格式，例如 mp4、avi、mkv 等。
  - 示例：`ffmpeg -i input.mp4 -f avi output.avi`

- **-ss**
  - 开始时间。设定从输入文件的哪个时间点开始处理，可以用于剪切视频。
  - 示例：`ffmpeg -ss 00:00:30 -i input.mp4 -t 10 output.mp4`（从30秒开始，持续10秒）

- **-t**
  - 持续时间。设定处理的持续时间，从开始时间到指定的结束时间。
  - 示例：`ffmpeg -i input.mp4 -t 60 output.mp4`（处理前60秒）

- **-formats**
  - 查看所有支持的容器格式。列出 FFmpeg 支持的所有容器格式。
  - 示例：`ffmpeg -formats`

- **-codecs**
  - 查看所有编解码器。列出 FFmpeg 支持的所有编解码器，包括视频、音频和字幕编解码器。
  - 示例：`ffmpeg -codecs`

- **-filters**
  - 查看所有可用的滤镜。列出 FFmpeg 支持的所有视频和音频滤镜。
  - 示例：`ffmpeg -filters`

- **-pix_fmts**
  - 查看所有支持的像素格式。列出 FFmpeg 支持的所有像素格式。
  - 示例：`ffmpeg -pix_fmts`

- **-sample_fmts**
  - 查看所有支持的采样格式。列出 FFmpeg 支持的所有音频采样格式。
  - 示例：`ffmpeg -sample_fmts`

- **-i input_file**
  - 查看媒体文件 `input_file` 的信息。注意在这个参数后面不能接其他参数。
  - 示例：`ffmpeg -i test.mp4`

## 视频参数

- **-b**
  - 设定视频比特率，默认为200 Kbit/s。比特率影响视频质量和文件大小。
  - 示例：`ffmpeg -i input.mp4 -b:v 1000k output.mp4`

- **-r**
  - 设定帧速率，默认为25。帧速率影响视频的流畅度。
  - 示例：`ffmpeg -i input.mp4 -r 30 output.mp4`

- **-s**
  - 设定画面的宽与高。指定输出视频的分辨率。
  - 示例：`ffmpeg -i input.mp4 -s 1280x720 output.mp4`

- **-aspect**
  - 设定画面的比例。调整视频的宽高比。
  - 示例：`ffmpeg -i input.mp4 -aspect 16:9 output.mp4`

- **-vn**
  - 不处理视频。指定输出文件不包含视频流。
  - 示例：`ffmpeg -i input.mp4 -vn output.mp3`

- **-vcodec**
  - 设定视频编解码器，未设定时则使用与输入流相同的编解码器。
  - 示例：`ffmpeg -i input.mp4 -vcodec libx264 output.mp4`

## 音频参数

- **-ar**
  - 设定采样率。指定输出音频的采样率，例如 44100 Hz。
  - 示例：`ffmpeg -i input.mp4 -ar 44100 output.mp3`

- **-ac**
  - 设定声音的声道数。指定输出音频的声道数，例如单声道或立体声。
  - 示例：`ffmpeg -i input.mp4 -ac 2 output.mp3`

- **-acodec**
  - 设定声音编解码器，未设定时则使用与输入流相同的编解码器。
  - 示例：`ffmpeg -i input.mp4 -acodec aac output.mp4`

- **-an**
  - 不处理音频。指定输出文件不包含音频流。
  - 示例：`ffmpeg -i input.mp4 -an output.mp4`


## 视频剪切命令解释

```shell
ffmpeg  -i "A.mp4"  -vn -acodec copy -ss 00:11:31 -t 00:21:18 "A1.mp4"
```

- `ffmpeg：调用` `ffmpeg` 工具。
- `-i "A.mp4"`：指定输入文件为 `A.mp4`。
- `-vn`：不处理视频部分（即去掉视频流，只处理音频部分）。
- `-acodec copy`：复制音频编解码器。也就是说，不重新编码音频流，而是直接复制音频流。
- `-ss 00:11:31`：设置开始时间，从 00:11:31 开始截取。
- `-t 00:21:18`：设置持续时间，截取 21 分钟18秒。
- `"A1.mp4"`：输出文件名为 `A1.mp4`。


## 示例

假设有一个视频 A.mp4，完成以下要求，并把每一个要求的命令单独输出，要求保留原视频文件，保持视频的分辨率、编码不变。

- 1、请抽取视频里的音频，命名为 A.mp3
  - `ffmpeg -i A.mp4 -q:a 0 -map a A.mp3`
- 2、请把视频从 00:10:00 分钟开始，往后截取 5 分钟，输出为A1.mp4
  - `ffmpeg -i A.mp4 -ss 00:10:00 -t 00:05:00 -c copy A1.mp4`
- 3、请把视频从 00:10:00 分钟开始，截取到第 20 分钟，输出为A2.mp4
  - `ffmpeg -i A.mp4 -ss 00:10:00 -to 00:20:00 -c copy A2.mp4`
- 4、请把视频转为 avi 格式，输出为 A.avi
  - `ffmpeg -i A.mp4 -c copy A.avi`




