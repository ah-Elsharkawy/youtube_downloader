const ytpl = require('ytpl');
const downloadVideo = require('./download');
const readline = require('readline');


const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let playlist_link;
r1.question("Enter the playlist_url: ", (line) => {
playlist_link = line;
r1.close();
console.log("the download is starting ....");
getPlaylistItems(playlist_link);
})


async function getPlaylistItems(playlist_link)
{
  try
  {
    let playlist = await ytpl(playlist_link);
    playlist = playlist.items;

    for(let i=0; i<playlist.length; i++)
    {
      let video = playlist[i];
      if(video.index >=43 && video.index < 45)
      {
        await downloadVideo(video.url)
      }
    }
  }
  catch(err)
  {
    console.log(err);
  }
}



// getPlaylistItems("https://www.youtube.com/playlist?list=PLhy8TB5U6n17R78U7usaLQfCC8nbnG8Nc");