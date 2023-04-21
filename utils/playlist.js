const ytpl = require('ytpl');
const Video = require('./video');

class Playlist {

    constructor(playlistURL) {
        this.playlistURL = playlistURL;
        this.playlistTitle = null;
        this.playlistItems = [];
    }

    async fetchInfo() {
        try {
            let playlistInfo = await ytpl(this.playlistURL);
            this.playlistItems = playlistInfo.items;
            this.playlistTitle = playlistInfo.title;
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

    async getVideosInfo() {
        let VideosInfo = [];
        for (let i=0; i<this.playlistItems.length;  i++)
        {
            let response = await fetch(`http://localhost:4500/video/?url='${encodeURIComponent(this.playlistItems[i].url)}'`);
            let data = await response.json(); // wait for the response data
            VideosInfo.push(data);
        }
        return VideosInfo;
    }

    async download(list) {
        for(let i=0; i<list.length; i++)
        {
            let ytb_video = new Video(list[0].url);
            await ytb_video.fetchInfo();

            await ytb_video.download(list[i].format, list.directoryPath);
        }
    }
}


let ytb_playlist = new Playlist("https://www.youtube.com/playlist?list=PL7WgedEl7kIQWqycobcyku9tWgpP8fjKe");

/* (async () => {
    await ytb_playlist.fetchInfo();
    const videosInfo = await ytb_playlist.getVideosInfo();
    videosInfo.forEach((v) => {
        console.log(v.availableVideoQualities);
    })
})() */