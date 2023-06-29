const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/cdDB', { useNewUrlParser: trye, useUnifiedTopology: true });

const express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

let users = [
    {
        id: 1,
        name: "Kim",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Joe",
        favoriteMovies: ["Papillon"]
    },

]


let movies = [

    {
        "Title": "The Wizard of Oz",
        "Description": "Dorothy meets up with Pink Floyd and learns valuable team building skills in her dream. Or was it...???",
        "Genre": {
            "Name": "Drama",
            "Description": "A serious film without much comedy. Witches Die!"
        },
        "Director": {
            "Name": "Victor Flemming",
            "Bio:": "Victor Lonzo Fleming was an American film director, cinematographer, and producer. His most popular films were Gone with the Wind, for which he won an Academy Award for Best Director, and The Wizard of Oz.",
            "Birth": "1889"
        },
        "ImageURL": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0032138%2F&psig=AOvVaw2mUnaFxBlFUNPzmHgKXo-R&ust=1687349471266000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJiKvODo0f8CFQAAAAAdAAAAABAE",
        "Featured": false
    },

    {
        "Title": "Papillon",
        "Director": {
            "Name": "Franklin J. Shaffner",
        }
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

//CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)

    } else {
        res.status(400).send('users need names')
    }
})

//UPDATE
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

//CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s`);
    } else {
        res.status(400).send('no such user')
    }
})
//DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title=> title !==movieTitle);
        res.status(200).send("${movieTitle} has been removed from user ${id}'s array");
    } else {
        res.status(400).send('no such user')
    }
})
//DELETE
app.delete('/users/:id/', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send('User ${id} has been deleted');
    } else {
        res.status(400).send('no such user')
    }
})


// READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

// READ
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
})
// READ
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
})

// READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
})

app.listen(8080, () => console.log("listening on 8080"));