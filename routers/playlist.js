const Playlist = require('../utils/playlist');
const express = require("express");
const router = express.Router();

router.get('/preview', (req, res) => {
    let playlistUrl = req.query.url.substring(1, req.query.url.length-1);
    console.log("url received: ", playlistUrl);

    (async () => {
        try {
            let ytb_playlist = new Playlist(playlistUrl);
            await ytb_playlist.fetchInfo();
            res.send({
                title: ytb_playlist.playlistTitle,
                items: ytb_playlist.getQuickPreview()
            });
        } catch(err) {
            res.send(err.message);
        }
    })();
});

router.get('/details', (req, res) => {

    let playlistUrl = req.query.url.substring(1, req.query.url.length-1);
    console.log("url received: ", playlistUrl);

    (async () => {
        try {
            let ytb_playlist = new Playlist(playlistUrl);
            await ytb_playlist.fetchInfo();
            let playlistInfo = await ytb_playlist.getVideosInfo();
            res.send({
                title: ytb_playlist.playlistTitle,
                items: playlistInfo
            });
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    })();        

});


router.post('/download', (req, res) => {
    let selectedList = req.body.selectedList;
    let ytb_playlist = new Playlist(req.body.playlistUrl);
    (async () => {
        try {
            await ytb_playlist.download(selectedList);
        }

        catch (err) {
            res.send(err.message);
        }
    })()
})

module.exports = router;