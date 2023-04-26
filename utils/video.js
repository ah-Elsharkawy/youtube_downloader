const ytdl = require("ytdl-core");
const sanitize = require("sanitize-filename");
const cliProgress = require("cli-progress");
const fs = require("fs");

class Video {
	constructor(videoUrl) {
		this.videoUrl = videoUrl;
		this.videoInfo = null;
		this.videoTitle = null;
	}

	async fetchInfo() {
        try {
            this.videoInfo = await ytdl.getInfo(this.videoUrl);
		    this.videoTitle = sanitize(this.videoInfo.videoDetails.title);
        }

        catch (error)
        {
            console.log(error.message);
        }
		
	}

	getVideoQualities() {
		let formats = this.videoInfo.formats.filter(
			(format) => format.hasAudio && format.hasVideo
		);
		let qualities = formats.map((format) => {
			return {
				qualityLabel: format.qualityLabel,
				itag: format.itag,
				size: this.calculateFileSize(format),
			};
		});
		return qualities;
	}

	getAudioFormats() {
		let audioFormats = this.videoInfo.formats.filter(
			(format) => format.hasAudio && !format.hasVideo
		);
		let audioCodec = audioFormats.map((format) => {
			return {
				container: format.container,
				itag: format.itag,
				size: this.calculateFileSize(format),
			};
		});
		return audioCodec;
	}

	getLengthInSeconds() {
		let lengthInSeconds = parseInt(this.videoInfo.videoDetails.lengthSeconds);
		return lengthInSeconds;
	}

	calculateFileSize(format) {
		return (format.bitrate * this.getLengthInSeconds()) / 8;
	}

	async download(format, directoryPath) {
        try {

        const videoPath = directoryPath + this.videoTitle;
		const progressBar = new cliProgress.SingleBar(
			{},
			cliProgress.Presets.shades_classic
		);
		const start = fs.existsSync(videoPath) ? fs.statSync(videoPath).size : 0;
		const end = format.size;

		let options = {
			quality: format.itag,
			range: { start: start, end: end },
		};

		const videoStream = ytdl(this.videoUrl, options);
		progressBar.start(100, 0);

		return new Promise((resolve, reject) => {
			videoStream
				.on("error", (error) => {
					console.error(`Error downloading video: ${error.message}`);
					resolve("the video is either downloaded or can't be downloaded");
				})
				.on("end", () => {
					console.log(`\nFinished downloading ${videoTitle}!`);
					resolve("downloaded succesfully");
				})
				.on("progress", (chunkLength, downloaded, total) => {
					const percent = downloaded / total;
					progressBar.update(percent * 100);
				})
				.pipe(fs.createWriteStream(videoPath, { flags: "a" }));
		});
        }

        catch (error)
        {
            console.log(error.message);
        }
		
	}
}

module.exports = Video;

