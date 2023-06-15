const express = require("express"),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));


let topMovies = [

    {
        title: 'The Wizard of Oz',
        director: 'Victor Flemming',
    },
    {
        title: 'Papillon',
        director: 'Franklin J. Shaffner',
    },
    {
        title: 'Jaws',
        director: 'Steven Spielberg',
    },
    {
        title: 'Back to the Future',
        director: 'Robert Zemeckis',
    },
    {
        title: 'Return of the Jedi',
        director: 'Richard Marquand',
    },
    {
        title: 'The Princess Bride',
        director: 'Rob Reiner',
    },
    {
        title: 'Caddyshack',
        director: 'Harold Raimis',
    },
    {
        title: 'A League of Their Own',
        director: 'Penny Marshall',
    },
    {
        title: 'The Terminator',
        director: 'James Cameron',
    },
    {
        title: 'Life is Beautiful',
        director: 'Roberto Benigni',
    },  
]
app.get('/', (req, res) => {
    res.send('Welcome to my movie list! Joe Dirt is not funny!');
  });
  
  app.use('/static', express.static('public'));  
  
  app.get('/movies', (req, res) => {
    res.json(topMovies);
  });
  
  
  // listen for requests
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });