const Video = require('../utils/video');
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {

    // Remove the quotes
    let videoUrl = req.query.url.substring(1, req.query.url.length-1);

    // IIFE to use async/await as fetching data is asynchronous
    (async () => {

        try{
            let ytb_video = new Video(videoUrl);
            await ytb_video.fetchInfo();
            
            res.status(200).send(
                {
                    videoTitle: ytb_video.videoTitle,
                    availableVideoQualities: ytb_video.getVideoQualities(),
                    availableAudio: ytb_video.getAudioFormats()
                }
            )
        }
        catch(err)
        {
            res.send(err);
        }

    })()
});

router.post('/download', (req, res) => {

    let videoInfo = req.body;
    console.log(videoInfo.videoUrl);
    (async () => {

        try {
            let ytb_video = new Video(videoInfo.videoUrl);
            await ytb_video.fetchInfo();
            await ytb_video.download(videoInfo.format, videoInfo.directoryPath);
            res.send("Success");
        }
        catch (error) {
            console.log(error.message);
            res.send(error.message);
        }
    })()
});


module.exports = router;