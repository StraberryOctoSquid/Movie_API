# myFlix
Welcome to myFlix!
myFlix is an app that allows users to join our community of cinephiles and share information about movies!

### Links
- [Documentation](https://straberryoctosquid-1858bcf4dbcb.herokuapp.com/documentation)
- [API](https://straberryoctosquid-1858bcf4dbcb.herokuapp.com/)
- [Github](https://github.com/StraberryOctoSquid/movie_api)

## How to use myFlix.
1. [Signup](#Signup)
2. [Login](#Login)
3. [View Movies](#View-Movies)
4. [View details from a specific movie](#View-a-specific-movie)
5. [Add a movie to your favorites](#add-a-movie-to-your-favorites)
6. [View your profile](#view-your-profile)
7. [Remove a movie from your favorites](#remove-a-movie-from-your-favorites)
8. [Update your profile data](#update-your-profile-data)


### Signup
Welcome to myFlix! Setting up a new account is fast and easy.

- Send a post request to the endpoint /users
- The body of the request should contain a JSON object holding the new user's Username, Password, Birthday, and an array containing their favorite movies, structured like: { "Username": "Mary", "Password": 1234, "Birthday": 1984-08-04 "favoriteMovies":[ ] }

### Login
Now that you've created a new account, let's get you logged-in!

- Send a post request to the endpoint /login
- Include params with your request
    - The first param will have a key of "Username" and a value of "your username"
    - The second param will have a key of "Password" and a value of "your password"
- A sucessful request will return your very own JWTToken. This token can now be used to access the rest of the app!
- Be sure to include your bearer token in the authorization for all further requests!
### View Movies

Let's see what were dealing with here! Curious about what movies are in our database? Let's get a list of the movie's titles for you!

- Send a get request to the endpoint /movies
- This will return an array of all of the movie titles in our database

### View a scpecific movie

Want to see details about a specific movie?

- Create a get request to the endpoint /movies[Title]
- This will return a JSON object holding data about the single movie that you selected.

### Add a movie to your favorites

Now that you are a full fledged member of myFlix, let's customize your account and add some favorite movies!

- Send a post request to the endpoint /users/[Username]/movies/[MovieID]
- This will push a new movie to your favorites!

### View your profile

Want to know how your profile looks?

- Create a get request to the endpoint /users/[Username]
- You will receive a JSON object holding data about your profile, including your current favorite movies, conveniently listed by id, so you have no idea what they actually are.

### Remove a movie from your favorites

Sick and tired of Jim Jarmusch... Me too. Let's get Dead Man out of our favorite movies.

- Create a delete request to the endpoint /users/:Username/movies/[movieID]
- The movie ID that you entered in your request will no longer be in your favorites

### Update your profile data

Would you like to change your username or password?

- Submit a put request to the endpoint /users/[Username]
- The body of this request should include a JSON object holding the User's new information Structured like: { "Username": "Marty", "Password": 4321, "Birthday": 1984-08-05 "favoriteMovies":[649b1c056db5b556f1562cbd] }