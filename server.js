const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/front-star-wars-angular'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res) =>
    // res.sendFile('index.html', {root: 'dist/front-star-wars-angular/'})
    res.sendFile(path.resolve(__dirname, './dist/index.html'))
);

app.listen(process.env.PORT || 8080);