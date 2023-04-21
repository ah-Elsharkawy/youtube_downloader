const ytdl = require('ytdl-core');
const sanitize = require('sanitize-filename');
const cliProgress = require('cli-progress');
const fs = require('fs');
const { format } = require('path');

async function downloadVideo(videoUrl) {
  const videoInfo = await ytdl.getInfo(videoUrl);
  const videoTitle = sanitize(videoInfo.videoDetails.title);
  const videoPath = `/home/ahmed/Downloads/${videoTitle}.mp4`;
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const formats = videoInfo.formats.filter((format) => format.hasAudio && format.hasVideo);
  const selected_format = formats.find((format) => format.qualityLabel === '360p');
  const selected_quality_itag = selected_format.itag;
  const start = fs.existsSync(videoPath) ? fs.statSync(videoPath).size : 0;
  const end = Math.ceil(parseInt(videoInfo.videoDetails.lengthSeconds) * parseInt(selected_format.bitrate) / 8);

  console.log(start, typeof(start), end, typeof(end));

  let options = {
    quality: selected_quality_itag,
    filter: 'videoandaudio',
    range: {start: start, end: end}
  }
  
  const videoStream = ytdl(videoUrl, options);
  progressBar.start(100, 0);

  // The promise to ensure that when downloading a playlist, we will download one video at a time
  return new Promise((resolve, reject) => {
    videoStream
    .on('error', (error) =>{
        console.error(`Error downloading video: ${error.message}`);
        resolve();   
    })
    .on('end', () => {
        console.log(`\nFinished downloading ${this.videoTitle}!`);
        resolve()})
    .on('progress', (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        progressBar.update(percent * 100);
      })
    .pipe(fs.createWriteStream(videoPath, { flags: 'a' }));
  });

  // if we need to download all the files at the same time we can use this block and remove the promise part
  
  /* videoStream
    .on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      progressBar.update(percent * 100);
    })
    .on('error', (error) => {
      console.error(`Error downloading video: ${error.message}`);
    })
    .on('end', () => {
      console.log(`\nFinished downloading ${videoTitle}!`);
    })
    .pipe(fs.createWriteStream(videoPath, {flags: 'a'})); */
}

module.exports = downloadVideo;

