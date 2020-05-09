const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/front-star-wars-angular'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/Front-Star-Wars-Angular/'})
);

app.listen(process.env.PORT || 8080);