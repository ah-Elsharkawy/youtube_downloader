const express = require('express');
const cors = require('cors');
const videoRouter = require("./routers/video");
const playlistRouter = require("./routers/playlist");

const app = express();

app.use((req, res, next) => {
    console.log(req.query);
    next();
})
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use('/video', videoRouter);
app.use('/playlist', playlistRouter);

app.listen(4500, () => console.log("listening on port 4500"));