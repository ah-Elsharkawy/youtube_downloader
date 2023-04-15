# Youtube Downloder

## Introduction

This app was made for personal usage, the app is just two functions one for downloading a single video and the other for a playlist.
the app has static status regarding the video quality, audio or video, the start and the end of the playlist to be downloaded, any change needed we will have to change it in the code directly.

## Installation

1. install [Nodejs](https://nodejs.org/en/download).
2. run ```npm install``` to install the required dependencies.

## Current status

The app provides full functionality for downloading playlist or a single video with pause and resume capabilities.
to download a single video:

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

you can copy this line and paste in download.js file, change  then run the file using:

## To be done

will make a complete app with dynamic options and API's for different functionalities like:

- API for a single video.
- API for a list of videos.
- Ability to choose the file format whether video, audio or both.
- Ability to choose the quality from available qualities.
- ability to choose which files to download and which is not.

