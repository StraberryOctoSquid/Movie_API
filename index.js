const mongoose = require('mongoose');
const Models = require('./Models/models.js');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const { title } = require('process');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);


const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://127.0.0.1/cdDB', { useNewUrlParser: true, useUnifiedTopology: true });


// Creating GET route at endpoint "/movies" returning JSON object (Returns all movies)
  app.get('/movies', (req, res) => {
    Movies.find()
      .then((movies) => {
        let movieTitles = [] 
        movies.forEach (function(movie) {
          movieTitles .push ({"Title": movie.Title})
          console.log("movieis",movie.Title,movieTitles)
        });
        res.status(201).json(movieTitles)
        // console.log(movies);
        // res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  
  // Creating GET route at endpoint "/users" returning JSON object (Returns all users)
  app.get('/users', (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  // Creating GET that returns movies by title (READ)
  app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  // Creating GET that returns the Genre by name(READ)
  app.get('/movies/genres/:genreName', (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.genreName })
      .then((movie) => {
        res.status(200).json(movie.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  
  // Creating GET that returns data from Director by name(READ)
  app.get('/movies/directors/:directorName', (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.directorName })
      .then((movie) => {
        res.json(movie.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

// Allow new users to Register (CREATE)
  app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });


// Allow users to update user info(username) (UPDATE)
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// Allow users to add movies to ther favorites list and sent text of confirmations as added (CREATE)
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


  // Allow users to remove a movie from the favorites list (DELETE)
  app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $pull: { FavoriteMovies: req.params.MovieID } },
      { new: true }
    )
      .then(updatedUser => {
        res.json(updatedUser);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });
  

  //Allow users to delete the registration
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
  





  
  
    // Creating GET route at endpoint "/" returning text
    app.get('/', (req, res) => {
      res.send('Happy Viewing!!!');
    });

    // This Serves the statics files in the "public" folder
    app.use(express.static('public'));

    // Creating a write stream (in append mode) to the log file
    const accessLogStream = fs.createWriteStream(path.join(__dirname,'log.txt'), {flags: 'a'})

    // Log all requests using Morgan
    app.use(morgan('combined', {stream: accessLogStream}));

    // Creating error-handling that log all errors to terminal
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Opes, something went wrong!');
      });
  
  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');

  });