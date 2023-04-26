const Playlist = require('../utils/playlist');
const express = require("express");
const router = express.Router();

// get a quick preview of the playlist videos: titles, URL and Duration
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

// get the playlist videos details: format and qualities
router.get('/details', (req, res) => {

    let playlistUrl = req.query.url.substring(1, req.query.url.length-1);
    console.log("url received: ", playlistUrl);

    (async () => {
        try {
            console.log("inside the route");
            let ytb_playlist = new Playlist(playlistUrl);
            await ytb_playlist.fetchInfo();
            console.log("items", ytb_playlist.playlistItems);
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

// download the selected videos of the list
router.post('/download', (req, res) => {
    let selectedList = req.body.selectedList;
    let ytb_playlist = new Playlist(req.body.playlistUrl);
    (async () => {
        try {
            await ytb_playlist.download(selectedList);
            res.send("success");
        }

        catch (err) {
            res.send(err.message);
        }
    })()
})

module.exports = router;