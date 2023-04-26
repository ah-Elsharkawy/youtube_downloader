# Youtube Downloder

## Introduction

This app was made for personal usage, the app was just two functions one for downloading a single video and the other for a playlist (still available).
Extended the app to provide APIs to get and download the videos and the playlists.

## Installation

1. install [Nodejs](https://nodejs.org/en/download).
2. run ```npm install``` to install the required dependencies.

## Current status

The app provides different endpoints to get the playlist and videos info and download the choosen videos with the desired formats and qualities, the app downloads on the server which means that to use it you have to get and run the code on your local host.

## API Endpoints

To use the APIs you have to run `node App.js`

### video APIs

1. `GET: /api/v1/video/`:
This endpoint is used to retrieve information about a YouTube video. The video information includes the title of the video, available video qualities, and available audio formats. The endpoint accepts a url parameter in the query string, which should contain the URL of the YouTube video encoded using encodeURIComponent("videoUrl").
Example Usage:

```text
GET: http://localhost:4500/video/?url='https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DyJg-Y5byMMw'
```

Response:

```text
{
    "videoTitle": "Warriyo - Mortals (feat. Laura Brehm) [NCS Release]",
    "availableVideoQualities": [
        {
            "qualityLabel": "720p",
            "itag": 22,
            "size": 44012138.75
        },
        {
            "qualityLabel": "360p",
            "itag": 18,
            "size": 9315172.5
        }
    ],
    "availableAudio": [
        {
            "container": "webm",
            "itag": 251,
            "size": 4183240
        },
        {
            "container": "mp4",
            "itag": 140,
            "size": 3778900
        },
        {
            "container": "webm",
            "itag": 250,
            "size": 2140955
        },
        {
            "container": "webm",
            "itag": 249,
            "size": 1629780
        }
    ]
}
```

2. `POST: /api/v1/video/download`:
This endpoint is used to download a YouTube video. The endpoint accepts a JSON object in the request body, which should contain the videoUrl of the YouTube video, the format in which the video should be downloaded, and the directoryPath where the video should be saved.

Example Usage:

```text
POST: http://localhost:4500/api/v1/video/download
Body:
{
    "videoUrl": "https://www.youtube.com/watch?v=yJg-Y5byMMw",
    "directoryPath": "/home/ahmed/Downloads/",
    "format": {
        "itag": 18,
        "size": 9315172
    }
}
```

Response:

the download starts on the localhost and after completion it sends success if not it sends the error message.

### playlist APIs

1. `GET: /api/v1/playlist/preview`:
This endpoint is used to get a quick preview of a YouTube playlist. The preview includes the title of the playlist and a list of video titles, URLs, and durations. The endpoint accepts a url parameter in the query string, which should contain the URL of the YouTube playlist encoded using encodeURIComponent("playlistUrl").

Example Usage:

```text
GET: http://localhost:4500/api/v1/playlist/preview?url='https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb'
```

Response (part of the items):\

```text
{
    "title": "NCS Top 50 most viewed songs",
    "items": [
        {
            "title": "Cartoon - On & On (feat. Daniel Levi) [NCS Release]",
            "url": "https://www.youtube.com/watch?v=K4DyBUG242c&list=PL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb&index=1&pp=iAQB8AUB",
            "duration": "3:28"
        },
        {
            "title": "DEAF KEV - Invincible [NCS Release]",
            "url": "https://www.youtube.com/watch?v=J2X5mJ3HDYE&list=PL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb&index=2&pp=iAQB8AUB",
            "duration": "4:34"
        },
        {
            "title": "Different Heaven & EH!DE - My Heart [NCS Release]",
            "url": "https://www.youtube.com/watch?v=jK2aIUmmdP4&list=PL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb&index=3&pp=iAQB8AUB",
            "duration": "4:28"
        },
        ....]
}
```

2. `GET: /api/v1/playlist/details`:
This endpoint is used to get detailed information about a YouTube playlist. The detailed information includes the title of the playlist and a list of available video formats and qualities. The endpoint accepts a url parameter in the query string, which should contain the URL of the YouTube playlist encoded using encodeURIComponent("playlistUrl").
Example Usage:

```text
GET: http://localhost:4500/api/v1/playlist/details?url='https%3A%2F%2Fwww.youtube.com%2Fplaylist%3Flist%3DPL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb'
```

Response (part of the items):

```text
{
    "title": "NCS Top 50 most viewed songs",
    "items": [
        {
            "videoTitle": "Cartoon - On & On (feat. Daniel Levi) [NCS Release]",
            "availableVideoQualities": [
                {
                    "qualityLabel": "360p",
                    "itag": 18,
                    "size": 12596974
                }
            ],
            "availableAudio": [
                {
                    "container": "webm",
                    "itag": 251,
                    "size": 3798288
                },
                {
                    "container": "mp4",
                    "itag": 140,
                    "size": 3391570
                },
                {
                    "container": "webm",
                    "itag": 250,
                    "size": 1935856
                },
                {
                    "container": "webm",
                    "itag": 249,
                    "size": 1477710
                }
            ]
        },
        {
            "videoTitle": "DEAF KEV - Invincible [NCS Release]",
            "availableVideoQualities": [
                {
                    "qualityLabel": "720p",
                    "itag": 22,
                    "size": 25368153
                },
                {
                    "qualityLabel": "360p",
                    "itag": 18,
                    "size": 10102825.25
                }
            ],
            "availableAudio": [
                {
                    "container": "webm",
                    "itag": 251,
                    "size": 5469999
                },
                {
                    "container": "mp4",
                    "itag": 140,
                    "size": 4469693.5
                },
                {
                    "container": "webm",
                    "itag": 250,
                    "size": 2886932.5
                },
                {
                    "container": "webm",
                    "itag": 249,
                    "size": 2268000.75
                }
            ]
        },
        {
            "videoTitle": "Different Heaven & EH!DE - My Heart [NCS Release]",
            "availableVideoQualities": [
                {
                    "qualityLabel": "360p",
                    "itag": 18,
                    "size": 12046633.5
                }
            ],
            "availableAudio": [
                {
                    "container": "webm",
                    "itag": 251,
                    "size": 4830063.5
                },
                {
                    "container": "mp4",
                    "itag": 140,
                    "size": 4376607.5
                },
                {
                    "container": "webm",
                    "itag": 250,
                    "size": 2505197
                },
                {
                    "container": "webm",
                    "itag": 249,
                    "size": 1910840
                }
            ]
        },
        ...]
}
```

3. `POST: /api/v1/playlist/download`:
This endpoint is used to download selected videos from a YouTube playlist

Example usage:

```text
http://localhost:4500/api/v1/playlist/download
Body: 
{
    "playlistUrl": "https://www.youtube.com/playlist?list=PL0ZofDWNZQUsY3CLmXY3YOgBZY0ur76Lb",
    "selectedList": {
        "directoryPath": "/home/ahmed/Downloads/",
        "items": [
            {
                "url": "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                "format": {
                    "itag": 18,
                    "size": 9315172
                }
            },
            {
                "url": "https://www.youtube.com/watch?v=yJg-Y5byMMw",
                "format": {
                    "itag": 18,
                    "size": 9315172
                }
            },
            ...]
    }
}
```

Response:
Sends Success if downloaded and the error message if not

## Non APIs version

### Download a single video

1. Call the downloadVideo function in the download.js file with the video url as a paramter as follows:

```javascript
downloadVideo("https://www.youtube.com/watch?v=S19UcWdOA-I&list=PLhy8TB5U6n17R78U7usaLQfCC8nbnG8Nc&index=44");
```

2. Change the first part of the videoPath to the desired download path:

```javascript
// change this
const videoPath = `/home/ahmed/Downloads/${videoTitle}.mp4`;

// to be
const videoPath = `/YOUR_Download_PATH/${videoTitle}.mp4`;
```

3. Run the file:

``` text
node download.js
```

### Download a playlist

1. Change the download path in download.js file as in a single video download.
2. Run the ytb_playlist file:

``` text
node ytb_playlist.js
```

3. The program will ask for the playlist url, provide then enter.

## To be done

will make a complete app with dynamic options and API's for different functionalities like:

- [X] API for a single video.
- [X] API for a list of videos.
- [X] Ability to choose the file format whether video, audio or both.
- [X] Ability to choose the quality from available qualities.
- [X] Ability to choose which files to download and which is not.
- [ ] Send the downloaded files to the client.
- [ ] Front-end app using Reactjs
