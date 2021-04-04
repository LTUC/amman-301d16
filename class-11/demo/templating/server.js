'use strict';

const express = require('express');

const app = express();

// Use this as a talking point about environment variables
const PORT = process.env.PORT || 3000;

app.use(express.static('./public')); // request path /someFile.html look in  ./public/someFile.html
// Set the view engine for templating
app.set('view engine', 'ejs');

app.set('views', './views') // ./views is the default but we can override it if needed.

// Array of groceries for /list route
let list = ['apples', 'celery', 'butter', 'milk', 'eggs'];

// Array of quantities for /details route
let quantities = [
  {name: 'apples', quantity: 4},
  {name: 'celery', quantity: 1},
  {name: 'butter', quantity: 1},
  {name: 'milk', quantity: 2},
  {name: 'eggs', quantity: 12}
]

// Routes
app.get('/', (request, response) => {
  response.render('index'); // views/index.ejs  'views/' + name + '.' + engineExt
})

app.get('/list', (request, response) => {
  const data = {
    foods: list, // Object keys become variables in ejs
    name: request.query.name
  };
  response.render('list', data);
})

app.get('/quantities', (request, response) => {
  response.render('quantities', {groceryObjects: quantities});
})


app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
