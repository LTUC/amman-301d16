# Warm-Up Exercise
Read through this code as if you are the interpreter. Find all of the mistakes in this code and write down the correct syntax for each mistake.

## server.js

```
'use strict';

const express = require('express');

const app = express();
const pg = require('pg');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
// Declare the database url
const DATABASE_URL = process.env.DATABASE_URL;
const client = new pg.Client(DATABASE_URL);

// AddEventListener
client.on('error', (error) => {console.log(error)});

app.post('/', (request, response) => {
  // We should choose the column names in our insert
  let SQL = 'INSERT INTO users (username, password) VALUES ($1, $2)';

  let values = [request.body.username, request.body.password];
  
  client.query(SQL, values)
    .then(result => {
      response.send(result.rowCount);
    }).catch(error => {
      response.status(500).send('Something went wrong');
    })
})

client.connect()
.then( () => {
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
  });
}).catch(error => {
  console.log(error);
});

```

## schema.sql

```
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  username VARCHAR(255), 
  password VARCHAR(255),
  age INT
);
```
