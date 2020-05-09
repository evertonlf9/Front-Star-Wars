const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/Front-Star-Wars-Angular/'));

app.get('/*', (req, res) =>
    res.sendFile(path.join(__dirname + '/dist/Front-Star-Wars-Angular/index.html'))
);

app.listen(process.env.PORT || 8080);