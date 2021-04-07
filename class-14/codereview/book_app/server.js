'use strict';

require('dotenv').config();

// Application Dependencies
const express = require('express');
const superagent = require('superagent');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3001;

// Application Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Database Setup
const pg = require('pg');
console.log(process.env.DATABASE_URL);
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
client.connect().then(() => {
  console.log('connected to database');
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});


// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes

// Testin Route
app.get('/hello', (req, res) => { res.render('pages/index'); });

// Renders the home page
app.get('/', renderHomePage);

// Renders the search form
app.get('/searches/new', showForm);

// Creates a new search to the Google Books API
app.post('/searches', createSearch);

// Catch-all
app.get('*', (request, response) => response.status(404).send('This route does not exist'));

// app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS
// Only show part of this to get students started
function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';

  if (info.imageLinks) {
    let regex = /http/;
    let secureURL = info.imageLinks.thumbnail.replace(regex, 'https');
    this.imgURL = secureURL;
  } else {
    this.imgURL = placeholderImage;
  }

  this.title = info.title || 'No title available'; // shortcircuit
  this.description = info.description || 'No description available';
  this.author = info.authors || 'No author available';
  this.isbn = info.industryIdentifiers[0]['type'] + ' ' + info.industryIdentifiers[0]['identifier'];

}

// Note that .ejs file extension is not required

function renderHomePage(request, response) {
  const sql = 'SELECT * FROM books';
  // TODO fix Me
  // client
  client.query(sql)
    .then(dataFromDB => {
      response.render('pages/index', { books: dataFromDB.rows });
    })
    .catch((error) => {
      // TODO finish me
      console.log(error);
      response.render('pages/error', {errorText: 'Contact the developer!'});
    });
}

// The database that i am looking in for the table "books" does not contain that table.
// Looking in the wrong db
// DATABASE_URL could be incorrect or empty
// 1. DATABASE_URL may not have been loaded from .env in local - forgot to require('dotenv') and call config - mispelled '.env' ' .env"
// 2. DATABASE_URL may have been loaded from .env in production - We pushed .env and ran require('dotenv') and call config in heroku.
// 2. DATABASE in DATABASE_URL doesn't exist
// DATABASE does not contain a table called books
// 1. We did not run the schema from the sql to create
// 2. When we ran the schema from the sql to create, it had an error on the console and didn't create the table but we missed
// 3. When we ran the schema from the sql to create, but we misspelled the table name.
// 4. When we queried the database but we misspelled the table name.

function showForm(request, response) {
  response.render('pages/searches/new.ejs');
}

// No API key required
// Console.log request.body and request.body.search
function createSearch(request, response) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';

  console.log(request.body);
  console.log(request.body.search);


  // can we convert this to ternary?
  (request.body.search[1] === 'title') ? url += `+intitle:${request.body.search[0]}`: console.log('byAuthor');
  (request.body.search[1] === 'author') ? url += `+inauthor:${request.body.search[0]}`: console.log('byTitle');

  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => response.render('pages/searches/show', { searchResults: results }))
    .catch(error => {
      // how will we handle errors?
      console.log('Promise Rejection Error Being Handled');
      response.render('pages/error', { errorText: error });
    });

}
