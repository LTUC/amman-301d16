'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Our Dependencies
const client = require('./modules/client.js');
const location = require('./modules/location.js');
const weather = require('./modules/weather.js');
const yelp = require('./modules/yelp.js');
const parks = require('./modules/parks.js');
const movies = require('./modules/movies.js');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());

// Route Definitions
app.get('/location', locationHandler);
app.get('/weather', weatherHandler);
app.get('/yelp', yelpHandler);
app.get('/parks', parksHandler);
app.get('/movies', moviesHandler);

app.use('*', notFoundHandler);


function locationHandler(request, response) {
  const city = request.query.city;
  location.getLocationData(city)
    .then(data => sendJson(data, response))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!')
    });
}

function weatherHandler(request, response) {
  const { latitude, longitude } = request.query;
  weather(latitude, longitude)
    .then(summaries => sendJson(summaries, response))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!')
    });
}

function yelpHandler(request, response) {
  const location = request.query.search_query;
  yelp(location, request.query.page)
    .then(reviews => sendJson(reviews, response))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!')
    });
}

function parksHandler(request, response) {
  const location = request.query.search_query;
  parks(location)
    .then(parksList => sendJson(parksList, response))
    .catch( error => {
      console.log('ERROR', error);
      response.status(500).send('So sorry, something went wrong.');
    });
}

function moviesHandler(request, response) {
  const location = request.query.search_query;
  movies(location)
    .then(moviesList => sendJson(moviesList, response))
    .catch((error) => {
      console.error(error);
      response.status(500).send('Sorry. Something went wrong!')
    });
}

function sendJson(data, response) {
  response.status(200).json(data);
}

function notFoundHandler(request, response) {
  response.status(404).send('huh?');
}

function startServer() {
  app.listen(PORT, () => console.log(`Server up on ${PORT}`));
}

// Start Up the Server after the database is connected and cache is loaded
client.connect()
  .then(startServer)
  .catch(err => console.error(err));
