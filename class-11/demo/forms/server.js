'use strict';

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); // convert form data to an object and add it to request.body
app.use(express.json()); // convert json data to an object and add it to request.body
app.use(express.static('./public')); // static => does not change

app.post('/contact', (request, response) => {
  console.log('GET HANDLER');
  console.log(request.query); // We didn't put anything after the ? in the url
  console.log(request.body.firstname);  // Why is this empty??? 
  response.sendFile('./thanks.html', { root: './public' });
});

app.get('/contact', (request, response) => {
  console.log('GET HANDLER');
  console.log(request.query);
  response.sendFile('./thanks.html', { root: './public' });
});

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
