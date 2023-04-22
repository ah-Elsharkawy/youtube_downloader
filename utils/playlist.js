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
            let playlistInfo = await ytpl(this.playlistURL, {limit: Infinity}); // limit: infinity option to fetch all the videos from the playlist not just the firest 100
            this.playlistItems = playlistInfo.items;
            this.playlistTitle = playlistInfo.title;
        }
        catch(error)
        {
            console.log(error.message);
        }
    }

    getQuickPreview() {

        let basicInfo = [];
        this.playlistItems.forEach((item) => {
            basicInfo.push({
                title: item.title,
                url: item.url,
                duration: item.duration
            })
        })
        return basicInfo;
    }

    async getVideosInfo() {
        try {

            let VideosInfo = [];
            for (let i=0; i<this.playlistItems.length;  i++)
                {
                    let response = await fetch(`http://localhost:4500/video/?url='${encodeURIComponent(this.playlistItems[i].url)}'`);
                    let data = await response.json(); // wait for the response data
                    VideosInfo.push(data);
                }
            return VideosInfo;
        }
        catch (err)
        {
            console.log(err.message);
        }
        
    }

    async download(list) {
        for(let i=0; i<list.items.length; i++)
        {
            try {
                let ytb_video = new Video(list.items[i].url);
                await ytb_video.fetchInfo();
                await ytb_video.download(list.items[i].format, list.directoryPath);
            }

            catch (error)
            {
                console.log(error.message);
            }
            
        }
    }
}

module.exports = Playlist;
let ytb_playlist = new Playlist("https://www.youtube.com/playlist?list=PL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb");

(async () => {
    await ytb_playlist.fetchInfo();
    ytb_playlist.playlistItems.forEach((item) => {
        console.log("index: ", item.index, ",title: ", item.title);
    })
    let list = {
        directoryPath: "/home/ahmed/Downloads/",
        items: [
            {
                url: "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                format: {
                    "itag": 18,
                    "size": 9315172
                }
            },
            {
                url: "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                format: {
                    "itag": 18,
                    "size": 9315172
                }
            },
            {
                url: "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                format: {
                    "itag": 18,
                    "size": 9315172
                }
            },
            {
                url: "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                format: {
                    "itag": 18,
                    "size": 9315172
                }
            },
            {
                url: "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                format: {
                    "itag": 18,
                    "size": 9315172
                }
            }
        ]
    }
    // ytb_playlist.download(list);
    
})()